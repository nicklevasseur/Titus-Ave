#!/usr/bin/env python3
"""Builds the hearing-comparison chart page (HTML -> PDF via Chromium)."""
import math, os, json
from collections import Counter
from items import TITUS_ITEMS, LINCOLN_ITEMS, ALL_CASES

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hearing_charts.html")
SURF = "#fcfcfb"

CATS = [
    ("Grounded in the record or the ordinance",            "#2a78d6"),
    ("Questions testing the applicant's case",             "#1baf7a"),
    ("Own expertise used against the applicant's claim",   "#008300"),
    ("Own expertise supplied as the applicant's proof",    "#e34948"),
    ("Stated as fact, with no source in the record",       "#eda100"),
    ("Contradicted by the testimony given",                "#4a3aa7"),
    ("Weighed on a test the statute does not contain",     "#a8559e"),
]
# Counts are computed from the itemized lists in items.py -- never typed in
# here -- so the pies, the table and the appendix cannot drift apart.
# Slice order within each pie is chosen so adjacent hues clear the CVD and
# normal-vision gates (validated with the dataviz palette checker).
TITUS_ORDER   = [0, 1, 4, 3, 5, 6]
LINCOLN_ORDER = [0, 1, 2]

def tally(items, order):
    c = Counter(i[2] for i in items)
    assert set(c) <= set(order), "an item carries a category not in the slice order"
    return [(k, c[k]) for k in order if c[k]]

TITUS   = tally(TITUS_ITEMS, TITUS_ORDER)
LINCOLN = tally(LINCOLN_ITEMS, LINCOLN_ORDER)
N_TITUS, N_LINCOLN = len(TITUS_ITEMS), len(LINCOLN_ITEMS)

SHORT = ["In the record", "Question", "Expertise \u2014 against",
         "Expertise \u2014 as proof", "No source", "Contradicted", "Wrong test"]

def polar(cx, cy, r, deg):
    a = math.radians(deg - 90)
    return cx + r * math.cos(a), cy + r * math.sin(a)

def pie(slices, cx, cy, r, total, labels=True):
    out, ang = [], 0.0
    for idx, val in slices:
        sweep = 360.0 * val / total
        x1, y1 = polar(cx, cy, r, ang)
        x2, y2 = polar(cx, cy, r, ang + sweep)
        large = 1 if sweep > 180 else 0
        d = f"M {cx:.2f} {cy:.2f} L {x1:.2f} {y1:.2f} A {r} {r} 0 {large} 1 {x2:.2f} {y2:.2f} Z"
        out.append(f'<path d="{d}" fill="{CATS[idx][1]}" stroke="{SURF}" stroke-width="3"/>')
        if not labels:
            ang += sweep
            continue
        # direct label outside the arc
        lx, ly = polar(cx, cy, r + 22, ang + sweep / 2)
        anchor = "middle"
        if lx > cx + 14: anchor = "start"
        elif lx < cx - 14: anchor = "end"
        pct = round(100.0 * val / total)
        out.append(f'<text x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}" '
                   f'class="slice-lab" dominant-baseline="middle">{val} <tspan class="slice-pct">({pct}%)</tspan></text>')
        ang += sweep
    return "\n".join(out)

def legend(idxs):
    rows = []
    for i in idxs:
        label, col = CATS[i]
        rows.append(f'<li><span class="sw" style="background:{col}"></span>{label}</li>')
    return "\n".join(rows)

# ---- panel 3 data: scale of relief -------------------------------------
MEASURES = [
    ("Ordinance sections relief was sought from", 1, 6, "{:g}"),
    ("Dwelling units added",                      1, 13, "{:g}"),
    ("New principal buildings",                   0, 2, "{:g}"),
    ("New building footprint, sq ft",             0, 9360, "{:,.0f}"),
    ("New floor area, all floors, sq ft",         0, 19500, "{:,.0f}"),
]
BAR_W = 268
L_COL, T_COL = "#2a78d6", "#eb6834"

def measure_block(label, lin, tit, fmt):
    top = max(lin, tit, 1)
    lw = max(2, BAR_W * lin / top)
    tw = max(2, BAR_W * tit / top)
    def row(name, val, w, col):
        txt = fmt.format(val)
        return (f'<div class="mrow"><span class="mname">{name}</span>'
                f'<span class="mbar"><i style="width:{w:.1f}px;background:{col}"></i></span>'
                f'<span class="mval">{txt}</span></div>')
    return (f'<div class="measure"><div class="mlabel">{label}</div>'
            + row("S. Lincoln", lin, lw, L_COL)
            + row("Titus Ave", tit, tw, T_COL)
            + '</div>')

QUAL = [
    ("Use sought in the district", "Two-family permitted by right;<br>third unit sought", "Only single-family detached<br>permitted; multifamily sought"),
    ("Building type", "Existing building, compliant", "Townhouse, not permitted<br>in the district"),
    ("Height", "2 stories where 2.5 allowed", "3 stories and 38 ft where<br>2.5 and 35 ft allowed"),
    ("Lot area against requirement", "15,366 sq ft where 10,000<br>required — 154%", "49,484 sq ft where 78,000<br>required — 63%"),
    ("Broker's opinion in evidence", "Yes, a named broker", "None"),
    ("Case law cited in the application", "Two decisions, applied to facts", "None"),
    ("Outcome", "Denied, unanimously", "Approved, 4 to 1"),
]
qual_rows = "\n".join(
    f'<tr><th>{a}</th><td>{b}</td><td class="t">{c}</td></tr>' for a, b, c in QUAL)

tbl_rows = []
for i, (label, col) in enumerate(CATS):
    t = dict(TITUS).get(i, 0)
    l = dict(LINCOLN).get(i, 0)
    tbl_rows.append(f'<tr><th><span class="sw" style="background:{col}"></span>{label}</th>'
                    f'<td>{l}</td><td class="t">{t}</td></tr>')
tbl_rows.append(f'<tr class="tot"><th>Statements classified</th><td>{N_LINCOLN}</td>'
                f'<td class="t">{N_TITUS}</td></tr>')


def appendix(items):
    out = []
    for ts, quote, cat in items:
        label, col = SHORT[cat], CATS[cat][1]
        out.append(f'<tr><td class="ts">{ts}</td><td class="q">{quote}</td>'
                   f'<td class="cat"><span class="sw" style="background:{col}"></span>{label}</td></tr>')
    return ''.join(out)


RELIEF = {
 "lincoln": ("One section of the Land Use Code", [
   "<b>4.3-A.1.C</b> Multifamily Dwelling &mdash; convert an existing two-family to a three-family",
   "<b>One</b> dwelling unit added, inside an existing compliant building",
   "<b>No</b> new building, no new footprint, no new floor area",
   "Lot area <b>15,366 sq ft where 10,000 is required</b> &mdash; 154% of the requirement",
 ]),
 "titus": ("Six sections of the Land Use Code", [
   "<b>4.3-A.1.C</b> Multifamily Dwellings &mdash; a use the R-1B district does not permit",
   "<b>8.1.2</b> Planned Development Lot Area",
   "<b>5.3.1.E</b> Townhouse Building Type &mdash; districts permitted",
   "<b>5.3.1.E.5.B</b> Maximum height in stories &mdash; 3 where 2.5 is allowed",
   "<b>5.3.1.E.5.C</b> Maximum height in feet &mdash; 38 ft where 35 ft is allowed",
   "<b>8.7.2.F.2</b> Parking location for planned developments",
   "<b>Thirteen</b> dwelling units in <b>two</b> new buildings, 19,500 sq ft of new floor area",
   "Lot area <b>49,484 sq ft where 78,000 is required</b> &mdash; 63% of the requirement",
 ]),
}

def relief_block(key):
    head, bullets = RELIEF[key]
    lis = "".join(f"<li>{b}</li>" for b in bullets)
    return f'<p class="rhead">{head}</p><ul class="relief">{lis}</ul>'


def case_tally(items, order=None):
    c = Counter(i[2] for i in items)
    order = order or [0, 1, 2, 4, 3, 5, 6]
    return [(k, c[k]) for k in order if c[k]]

POOLED = [i for _, _, _, L in ALL_CASES for i in L]
N_POOLED = len(POOLED)
POOLED_SLICES = case_tally(POOLED)

def small_pie(case, addr, items):
    n = len(items)
    g = round(100 * sum(1 for i in items if i[2] == 0) / n)
    hi = " sp-hi" if case == "2026-063" else ""
    return (f'<div class="sp{hi}">'
            f'<svg viewBox="-4 -4 208 208" width="85" height="85" role="img" '
            f'aria-label="statements by category, {addr}">{pie(case_tally(items), 100, 100, 94, n, labels=False)}</svg>'
            f'<p class="sp-name">{addr}</p>'
            f'<p class="sp-n">{n} statements &middot; <b>{g}%</b> in record</p></div>')

sp_all = "".join(small_pie(c, a, L) for c, a, _, L in ALL_CASES)

conc = []
for cat, label in ((3, "own expertise supplied as the applicant&rsquo;s proof"),
                   (5, "findings contradicted by the testimony given")):
    tot = sum(1 for i in POOLED if i[2] == cat)
    tit = sum(1 for i in TITUS_ITEMS if i[2] == cat)
    conc.append(f"<li><b>{tit} of {tot} in Titus</b> &mdash; every one &mdash; {label}</li>")
tot4 = sum(1 for i in POOLED if i[2] == 4); tit4 = sum(1 for i in TITUS_ITEMS if i[2] == 4)
conc.append(f"<li><b>{tit4} of {tot4} in Titus</b> &mdash; statements stated as fact with no source in the record</li>")
conc = "".join(conc)

pooled_rows = []
for case, addr, _, L in ALL_CASES:
    c = Counter(i[2] for i in L)
    tds = "".join(f'<td>{c.get(k, 0) or ""}</td>' for k in range(len(CATS)))
    hi = ' class="hi"' if case == "2026-063" else ""
    pooled_rows.append(f'<tr{hi}><th>{addr}</th>{tds}<td class="cc-n">{len(L)}</td></tr>')
pc = Counter(i[2] for i in POOLED)
pooled_rows.append('<tr class="tot"><th>All six cases</th>' +
    "".join(f'<td>{pc.get(k, 0)}</td>' for k in range(len(CATS))) +
    f'<td class="cc-n">{N_POOLED}</td></tr>')
pooled_rows = "".join(pooled_rows)

BAR_PX = 300

def stacked(items):
    """One composition bar: a segment per category, 2px of surface between."""
    n = len(items)
    counts = Counter(i[2] for i in items)
    segs = []
    for cat in range(len(CATS)):
        v = counts.get(cat, 0)
        if not v: continue
        w = BAR_PX * v / n
        txt = str(v) if w >= 17 else ""
        segs.append(f'<i style="width:{w:.2f}px;background:{CATS[cat][1]}">{txt}</i>')
    return "".join(segs)

rows_cc = []
for case, addr, outcome, items in sorted(ALL_CASES, key=lambda c: -sum(1 for i in c[3] if i[2] == 0) / len(c[3])):
    segs = stacked(items)
    g = round(100 * sum(1 for i in items if i[2] == 0) / len(items))
    hi = ' class="hi"' if case == "2026-063" else ""
    rows_cc.append(
        f'<tr{hi}><th>{addr}<br><span class="cc-sub">{case} &middot; {outcome}</span></th>'
        f'<td class="cc-bar"><span class="bar">{segs}</span></td>'
        f'<td class="cc-n">{len(items)}</td><td class="cc-g">{g}%</td></tr>')
rows_cc = "".join(rows_cc)

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hearing charts</title>
<style>
@page {{ size: letter portrait; margin: 0.5in; }}
* {{ box-sizing: border-box; }}
body {{ margin:0; background:{SURF}; color:#0b0b0b;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size:11px; line-height:1.45; }}
.page {{ page-break-after: always; padding-bottom: 4px; }}
.page:last-child {{ page-break-after: auto; }}
h1 {{ font-size:19px; margin:0 0 3px; letter-spacing:-.01em; }}
.sub {{ font-size:11px; color:#52514e; margin:0 0 4px; }}
.rule {{ height:3px; background:#8B1414; margin:6px 0 10px; }}
h2 {{ font-size:13px; margin:0 0 2px; }}
.cap {{ font-size:10px; color:#52514e; margin:0 0 4px; }}
.pies {{ display:flex; gap:16px; justify-content:space-between; }}
.pie-card {{ flex:1; text-align:center; }}
.pie-card h3 {{ font-size:12.5px; margin:0 0 1px; }}
.pie-card .who {{ font-size:10px; color:#52514e; margin:0 0 2px; }}
.slice-lab {{ font-size:16px; font-weight:600; fill:#0b0b0b; font-family:inherit; }}
.slice-pct {{ font-size:13.5px; font-weight:400; fill:#52514e; }}
ul.legend {{ list-style:none; margin:8px 0 0; padding:0; columns:1; font-size:10.5px; }}
ul.legend li {{ margin:0 0 3px; display:flex; align-items:flex-start; gap:6px; }}
.sw {{ display:inline-block; width:9px; height:9px; border-radius:2px; flex:none; margin-top:3px; }}
table {{ border-collapse:collapse; width:100%; font-size:10.5px; margin-top:7px; }}
th, td {{ text-align:left; padding:2.9px 6px; border-bottom:1px solid #e3ddd4; vertical-align:top; }}
thead th {{ font-size:9.5px; text-transform:uppercase; letter-spacing:.05em; color:#52514e; border-bottom:1.5px solid #c9c1b5; }}
td {{ text-align:right; font-variant-numeric:tabular-nums; width:62px; }}
th .sw {{ margin-right:2px; }}
tr.tot th, tr.tot td {{ font-weight:700; border-top:1.5px solid #c9c1b5; border-bottom:none; }}
.measure {{ margin:0 0 9px; }}
.mlabel {{ font-size:11px; font-weight:600; margin:0 0 2px; }}
.mrow {{ display:flex; align-items:center; gap:7px; margin:1.5px 0; }}
.mname {{ width:66px; font-size:10px; color:#52514e; flex:none; }}
.mbar {{ width:{BAR_W}px; flex:none; display:block; }}
.mbar i {{ display:block; height:9px; border-radius:0 3px 3px 0; }}
.mval {{ font-size:10.5px; font-weight:600; font-variant-numeric:tabular-nums; }}
table.qual td {{ text-align:left; width:auto; font-size:10px; }}
table.qual th {{ width:150px; font-weight:600; font-size:10px; }}
table.qual td.t {{ background:#fdf4f0; }}
table td.t {{ background:#fdf4f0; }}
.key {{ display:flex; gap:16px; font-size:10.5px; margin:0 0 9px; }}
.key span {{ display:flex; align-items:center; gap:5px; }}
.pool {{ display:flex; gap:18px; align-items:flex-start; }}
.pool-pie {{ flex:none; text-align:center; }}
.pool-txt {{ flex:1; }}
.pool-txt h2 {{ margin-top:0; }}
.pool-txt p {{ margin:0 0 5px; font-size:10.2px; }}
ul.conc {{ margin:0 0 6px; padding-left:15px; font-size:10.2px; }}
ul.conc li {{ margin:0 0 2px; }}
.sps {{ display:flex; gap:6px; justify-content:space-between; margin-top:2px; }}
.sp {{ flex:1; text-align:center; padding:4px 2px; border-radius:4px; }}
.sp-hi {{ background:#f6e2d9; box-shadow:inset 0 0 0 1px #e4c3b6; }}
.argue {{ margin-top:2px; padding:9px 12px; background:#f6e2d9; border-radius:4px;
  box-shadow:inset 0 0 0 1px #e4c3b6; }}
.argue p {{ margin:0 0 6px; font-size:9.9px; line-height:1.45; }}
.argue p:last-child {{ margin-bottom:0; }}
.claim {{ font-size:11.6px !important; font-weight:700; margin-bottom:7px !important; }}
.sp-name {{ font-size:9.4px; font-weight:700; margin:1px 0 0; line-height:1.25; }}
.sp-n {{ font-size:8.8px; color:#52514e; margin:0; }}
table.pool-tbl {{ font-size:10px; margin-top:10px; }}
table.pool-tbl th:first-child {{ width:auto; font-weight:600; }}
table.pool-tbl td {{ width:30px; text-align:center; }}
table.pool-tbl thead th {{ text-align:center; }}
.rhead {{ font-size:10px; font-weight:700; margin:11px 0 3px; text-align:left;
  padding-top:7px; border-top:1px solid #c9c1b5; }}
ul.relief {{ list-style:none; margin:0; padding:0; text-align:left; font-size:9.6px; }}
ul.relief li {{ margin:0 0 2.5px; padding-left:9px; position:relative; line-height:1.35; }}
ul.relief li:before {{ content:"\\2013"; position:absolute; left:0; color:#8a8681; }}
table.cc {{ font-size:10px; margin-top:6px; }}
table.cc th {{ width:150px; font-weight:600; vertical-align:middle; }}
table.cc td {{ vertical-align:middle; }}
.cc-sub {{ font-weight:400; color:#52514e; font-size:9px; }}
td.cc-bar {{ width:{BAR_PX + 16}px; padding-top:9px; padding-bottom:9px; }}
td.cc-bar .bar {{ display:flex; gap:2px; width:{BAR_PX}px; }}
td.cc-bar .bar i {{ display:flex; align-items:center; justify-content:center; height:16px;
  border-radius:2px; font-size:9px; font-weight:700; color:#fff; font-style:normal;
  overflow:hidden; }}
td.cc-n, th.cc-n {{ width:26px; text-align:right; }}
td.cc-g, th.cc-g {{ width:52px; text-align:right; font-weight:700; }}
tr.hi th, tr.hi td {{ background:#f6e2d9; }}
ul.cc-legend {{ columns:2; margin:8px 0 0; font-size:10px; }}
ul.cc-legend li {{ break-inside:avoid; }}
table.app {{ font-size:9.5px; }}
table.app th, table.app td {{ padding:3px 6px; vertical-align:top; }}
table.app td {{ text-align:left; width:auto; }}
table.app td.ts, table.app th.ts {{ width:46px; white-space:nowrap; font-variant-numeric:tabular-nums; color:#52514e; }}
table.app td.cat .sw {{ margin-right:4px; }}
table.app td.cat, table.app th.cat {{ width:106px; white-space:nowrap; color:#52514e; }}
table.app td.q {{ line-height:1.35; }}
.foot {{ margin-top:7px; padding-top:4px; border-top:1px solid #c9c1b5; font-size:9.5px; color:#52514e; }}
</style></head><body>

<div class="page">
  <h1>His comments across the evening, with the outcomes set aside</h1>
  <p class="sub">The six of thirteen cases in which the transcript anchors who was speaking. Categories, counting rule and exclusions are identical in all six; the other seven are not counted. Nothing here turns on whether the Board granted or denied &mdash; only on where what he said came from.</p>
  <div class="rule"></div>

  <div class="pool">
    <div class="pool-pie">
      <svg viewBox="-78 -8 456 316" width="226" height="156" role="img" aria-label="all statements by category, six cases pooled">
        {pie(POOLED_SLICES, 150, 150, 105, N_POOLED)}
      </svg>
      <p class="sp-name">All six cases pooled &middot; {N_POOLED} statements</p>
    </div>
    <div class="pool-txt">
      <h2>What the pooled view shows</h2>
      <p>Across the evening he is, more often than not, working from the file: fifty-three of ninety-three statements rest on the application, the testimony, or the ordinance.</p>
      <p>The exceptions do not spread evenly across the six cases. They concentrate in one:</p>
      <ul class="conc">{conc}</ul>
    </div>
  </div>

  <ul class="legend cc-legend">{legend(range(len(CATS)))}</ul>

  <h2 style="margin-top:12px">Case by case</h2>
  <p class="cap">Each pie is one case, scaled to its own total, in the same order as the table below; the table&rsquo;s columns follow the legend order. Anchors and method: analysis/attribution.py, with every statement timestamped in the appendices.</p>
  <div class="sps">{sp_all}</div>

  <table class="pool-tbl">
    <thead><tr><th>Case</th><th><span class="sw" style="background:#2a78d6"></span></th><th><span class="sw" style="background:#1baf7a"></span></th><th><span class="sw" style="background:#008300"></span></th><th><span class="sw" style="background:#e34948"></span></th><th><span class="sw" style="background:#eda100"></span></th><th><span class="sw" style="background:#4a3aa7"></span></th><th><span class="sw" style="background:#a8559e"></span></th><th class="cc-n">N</th></tr></thead>
    <tbody>{pooled_rows}</tbody>
  </table>


  <h2 style="margin-top:10px">What changes at Titus Avenue</h2>
  <div class="argue">
    <p class="claim">In all other cases he acts like an investigator. In the Titus Avenue case he acts like an advocate.</p>
    <p><b>Investigator</b> &mdash; sticks to the record, asks questions that test the case, attaches conditions.<br>
       <b>Advocate</b> &mdash; brings in outside evidence, supplies what the applicant lacks, asks nothing.</p>
  </div>
</div>

<div class="page">
  <h1>Appendix &mdash; every statement counted, 26 Titus Avenue</h1>
  <p class="sub">Case ZBA2026-063. {N_TITUS} statements. Timestamps are from the City&rsquo;s recording of September 10, 2026.</p>
  <div class="rule"></div>
  <table class="app">
    <thead><tr><th class="ts">Time</th><th>Statement</th><th class="cat">Classified as</th></tr></thead>
    <tbody>{appendix(TITUS_ITEMS)}</tbody>
  </table>
</div>

<div class="page">
  <h1>Appendix &mdash; every statement counted, 218 South Lincoln Street</h1>
  <p class="sub">Case ZBA2026-055, heard immediately before Titus Avenue the same evening. {N_LINCOLN} statements.</p>
  <div class="rule"></div>
  <table class="app">
    <thead><tr><th class="ts">Time</th><th>Statement</th><th class="cat">Classified as</th></tr></thead>
    <tbody>{appendix(LINCOLN_ITEMS)}</tbody>
  </table>
  <p class="foot">The contrast is the point of the first page. At South Lincoln Street the Vice Chair worked from
  the applicant&rsquo;s own exhibit, the district&rsquo;s stated intent, and the evidence in the file, and used his outside
  knowledge once &mdash; to reject a claim the applicant had made. An hour later, at Titus Avenue, he supplied the
  applicant the property-value opinion its engineer had told the Board it did not obtain.</p>
</div>

</body></html>"""

open(OUT, "w").write(HTML)
print("wrote", OUT, len(HTML), "bytes")
