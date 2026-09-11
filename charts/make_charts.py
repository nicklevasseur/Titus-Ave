#!/usr/bin/env python3
"""Builds the hearing-comparison chart page (HTML -> PDF via Chromium)."""
import math, os, json
from collections import Counter
from items import TITUS_ITEMS, LINCOLN_ITEMS

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hearing_charts.html")
SURF = "#fcfcfb"

CATS = [
    ("Grounded in the record or the ordinance",            "#2a78d6"),
    ("Questions testing the applicant's case",             "#1baf7a"),
    ("Own expertise used against the applicant's claim",   "#008300"),
    ("Own expertise supplied as the applicant's proof",    "#e34948"),
    ("Stated as fact, with no source in the record",       "#eda100"),
    ("Contradicted by the testimony given",                "#4a3aa7"),
    ("Weighed on a test the statute does not contain",     "#e87ba4"),
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

def pie(slices, cx, cy, r, total):
    out, ang = [], 0.0
    for idx, val in slices:
        sweep = 360.0 * val / total
        x1, y1 = polar(cx, cy, r, ang)
        x2, y2 = polar(cx, cy, r, ang + sweep)
        large = 1 if sweep > 180 else 0
        d = f"M {cx:.2f} {cy:.2f} L {x1:.2f} {y1:.2f} A {r} {r} 0 {large} 1 {x2:.2f} {y2:.2f} Z"
        out.append(f'<path d="{d}" fill="{CATS[idx][1]}" stroke="{SURF}" stroke-width="3"/>')
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
.rule {{ height:3px; background:#8B1414; margin:7px 0 13px; }}
h2 {{ font-size:13.5px; margin:0 0 2px; }}
.cap {{ font-size:10px; color:#52514e; margin:0 0 6px; }}
.pies {{ display:flex; gap:16px; justify-content:space-between; }}
.pie-card {{ flex:1; text-align:center; }}
.pie-card h3 {{ font-size:12.5px; margin:0 0 1px; }}
.pie-card .who {{ font-size:10px; color:#52514e; margin:0 0 2px; }}
.slice-lab {{ font-size:16px; font-weight:600; fill:#0b0b0b; font-family:inherit; }}
.slice-pct {{ font-size:13.5px; font-weight:400; fill:#52514e; }}
ul.legend {{ list-style:none; margin:12px 0 0; padding:0; columns:1; font-size:10.5px; }}
ul.legend li {{ margin:0 0 3px; display:flex; align-items:flex-start; gap:6px; }}
.sw {{ display:inline-block; width:9px; height:9px; border-radius:2px; flex:none; margin-top:3px; }}
table {{ border-collapse:collapse; width:100%; font-size:10.5px; margin-top:10px; }}
th, td {{ text-align:left; padding:3.5px 6px; border-bottom:1px solid #e3ddd4; vertical-align:top; }}
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
table.app {{ font-size:9.5px; }}
table.app th, table.app td {{ padding:3px 6px; vertical-align:top; }}
table.app td {{ text-align:left; width:auto; }}
table.app td.ts, table.app th.ts {{ width:46px; white-space:nowrap; font-variant-numeric:tabular-nums; color:#52514e; }}
table.app td.cat .sw {{ margin-right:4px; }}
table.app td.cat, table.app th.cat {{ width:106px; white-space:nowrap; color:#52514e; }}
table.app td.q {{ line-height:1.35; }}
.foot {{ margin-top:11px; padding-top:6px; border-top:1px solid #c9c1b5; font-size:9.5px; color:#52514e; }}
</style></head><body>

<div class="page">
  <h1>Vice Chair St. Pierre's statements, measured against the record</h1>
  <p class="sub">Manchester Zoning Board of Adjustment, public hearing of September 10, 2026. Both cases heard the same evening, South Lincoln Street first.</p>
  <div class="rule"></div>

  <div class="pies">
    <div class="pie-card">
      <h3>218 South Lincoln Street</h3>
      <p class="who">Case ZBA2026-055 &middot; denied, unanimously</p>
      <svg viewBox="-74 -8 448 316" width="300" height="212" role="img" aria-label="Share of statements by category, South Lincoln Street">
        {pie(LINCOLN, 150, 150, 105, N_LINCOLN)}
      </svg>
      <ul class="legend">{legend([i for i,_ in LINCOLN])}</ul>
    </div>
    <div class="pie-card">
      <h3>26 Titus Avenue</h3>
      <p class="who">Case ZBA2026-063 &middot; approved, 4 to 1</p>
      <svg viewBox="-74 -8 448 316" width="300" height="212" role="img" aria-label="Share of statements by category, Titus Avenue">
        {pie(TITUS, 150, 150, 105, N_TITUS)}
      </svg>
      <ul class="legend">{legend([i for i,_ in TITUS])}</ul>
    </div>
  </div>

  <table>
    <thead><tr><th>Category</th><th>S. Lincoln</th><th class="t">Titus Ave</th></tr></thead>
    <tbody>{''.join(tbl_rows)}</tbody>
  </table>

  <p class="foot">Each substantive statement by the Vice Chair in each case is classified once, by hand, against the application file, the testimony given, and the Land Use Code. One entry per distinct assertion, question, or finding. Purely procedural remarks are excluded, as is the bare yes-or-no recitation of a statutory finding that adds no reasoning already counted &mdash; except where the recitation itself misstates the test, which is counted. A figure that can be derived from the City&rsquo;s own review sheet counts as grounded in the record even where no witness spoke it aloud. Every classified statement is listed with its timestamp on the pages that follow, so the counts can be audited line by line and re-argued where a reader disagrees. The two totals differ because he spoke more at Titus Avenue. Source: the City’s recording of the September 10, 2026 meeting, machine-transcribed, deliberations transcribed twice. Attributions rest on first names used on the recording and should be confirmed against the video.</p>
</div>

<div class="page">
  <h1>Scale of the relief requested</h1>
  <p class="sub">What each applicant asked the Board to set aside, on the same evening, under the same ordinance section &sect;4.3-A.1.C.</p>
  <div class="rule"></div>

  <h2>What was being added</h2>
  <p class="cap">Each measure is drawn to its own scale. Bars compare the two cases within a row, never across rows.</p>
  <div class="key">
    <span><i class="sw" style="background:{L_COL}"></i> 218 South Lincoln Street</span>
    <span><i class="sw" style="background:{T_COL}"></i> 26 Titus Avenue</span>
  </div>
  {''.join(measure_block(*m) for m in MEASURES)}

  <h2 style="margin-top:14px">Everything else</h2>
  <table class="qual">
    <thead><tr><th></th><th>218 South Lincoln Street</th><th class="t">26 Titus Avenue</th></tr></thead>
    <tbody>{qual_rows}</tbody>
  </table>

  <p class="foot">Figures from the City's Zoning Review sheets for each case and from the applications as submitted. South Lincoln: existing floor area 2,963 sq ft and footprint 1,823 sq ft, unchanged by the proposal, which adds one exterior door. Titus Avenue: footprint 5,760 plus 3,600 sq ft, total floor area 19,500 sq ft. Lot area percentages compare buildable lot area to the area the ordinance requires for the use proposed.</p>
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
