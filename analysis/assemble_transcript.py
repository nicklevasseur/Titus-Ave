#!/usr/bin/env python3
"""Assemble one continuous machine transcript of the September 10, 2026 ZBA
meeting from the separate small.en passes, then slice it by case.

Three passes cover the evening, with small deliberate overlaps:
    open_00/open_01   0:00:00 - 0:22:40   the roster, the standing script, case 079
    fine_both         0:21:30 - 2:03:30   South Lincoln Street and Titus Avenue
    rest_00..rest_07  2:00:00 - 4:40:00   everything after Titus

Overlaps are resolved by source precedence rather than by matching text, so a
line is never counted twice and the seam is always at a fixed clock time.

Writes  transcript_full.txt   one line per segment, whole meeting
        by_case/<case>.txt    one file per case, per analysis/cases.py

This is a machine transcript. It has no speaker labels and it misspells names.
It is a finding aid for the recording, never a substitute for it.
"""
import os, re, glob, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCR = "/tmp/claude-0/-home-user-Titus-Ave/85a077eb-e61c-52f6-aa40-06d2826cb948/scratchpad"
sys.path.insert(0, HERE)
from cases import CASES

LINE = re.compile(r'^\[(\d+):(\d\d):([\d.]+) -> ')

def secs(line):
    m = LINE.match(line)
    if not m: return None
    h, mm, s = m.groups()
    return int(h) * 3600 + int(mm) * 60 + float(s)

def load(path, lo, hi):
    """Lines from `path` whose start time falls in [lo, hi)."""
    out = []
    if not os.path.exists(path): return out
    for ln in open(path):
        t = secs(ln)
        if t is not None and lo <= t < hi:
            out.append((t, ln.rstrip("\n")))
    return out

SOURCES = [
    (0.0,      21 * 60 + 30, [f"{SCR}/open_00.txt", f"{SCR}/open_01.txt"]),
    (21 * 60 + 30, 2 * 3600, [f"{SCR}/fine_both.txt"]),
    (2 * 3600, 5 * 3600,     sorted(glob.glob(f"{SCR}/rest_*.txt"))),
]

rows = []
for lo, hi, paths in SOURCES:
    for p in paths:
        rows += load(p, lo, hi)
rows.sort(key=lambda r: r[0])

# whisper loops on dead air once the business meeting ends; drop the tail
CUT = 4 * 3600 + 38 * 60
rows = [r for r in rows if r[0] < CUT]

full = os.path.join(HERE, "transcript_full.txt")
with open(full, "w") as f:
    f.write("\n".join(r[1] for r in rows) + "\n")

def hms(t):
    h, m, s = t.split(":"); return int(h) * 3600 + int(m) * 60 + int(s)

os.makedirs(os.path.join(HERE, "by_case"), exist_ok=True)
print(f"{len(rows)} segments  {rows[0][0]/3600:.3f}h -> {rows[-1][0]/3600:.3f}h")
for case, addr, start, end, stakes, item in CASES:
    a, b = hms(start), hms(end)
    sub = [ln for t, ln in rows if a <= t < b]
    out = os.path.join(HERE, "by_case", f"{case}.txt")
    with open(out, "w") as f:
        f.write(f"# {case}  {addr}  ({stakes}, agenda item {item})\n")
        f.write(f"# recording {start} - {end}\n\n")
        f.write("\n".join(sub) + "\n")
    print(f"  {case}  {addr:32} {len(sub):5d} segments")
