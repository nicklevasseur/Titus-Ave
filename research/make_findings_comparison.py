#!/usr/bin/env python3
"""Point-for-point comparison: the findings of fact recited at the hearing and
voted upon, against the findings of fact in the written Notice of Decision."""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "findings_comparison.html")

ROWS = [
    ("1", "1:57:42",
     "&ldquo;it&rsquo;s a tremendously unique lot at 1.1 acres&rdquo;",
     "&ldquo;The lot is unique at 1.1 acres with steep slopes.&rdquo;",
     "Carried over. &ldquo;Tremendously&rdquo; becomes &ldquo;unique.&rdquo;"),
    ("2", "1:57:48",
     "&ldquo;and a lot of slopes including <b>18% that is undevelopable based on the city&rsquo;s "
     "calculation of the slope review</b>&rdquo;",
     "merged into the bullet above as &ldquo;with steep slopes&rdquo;",
     "<b>Altered.</b> The figure, and its source in the City&rsquo;s slope calculation, are gone. "
     "&ldquo;Steep slopes&rdquo; states no quantity and cites nothing."),
    ("3", "1:57:55",
     "&ldquo;the quieting of title on the paper street creates additional buffers <b>to the "
     "properties on the north</b>, <b>whether through the applicant or the other neighbors&rsquo; "
     "efforts</b>&rdquo;",
     "&ldquo;The paper street provides an additional buffer <b>from Mystic Street</b>.&rdquo;",
     "<b>Altered.</b> The quiet-title action is dropped, the beneficiary changes from &ldquo;the "
     "properties on the north&rdquo; to &ldquo;Mystic Street,&rdquo; and the acknowledgment that "
     "the buffer may arise from <i>the neighbors&rsquo;</i> efforts is gone."),
    ("4", "1:58:07",
     "&ldquo;there are additional buffers then <b>beyond what the plan development requires in "
     "itself</b>&rdquo;",
     "&mdash; absent &mdash;",
     "<b>Dropped entirely.</b>"),
    ("5", "1:58:13",
     "&ldquo;in allowing this as a plan development it reduces the need for curb cuts on Calef Road "
     "and preserves existing on street parking&rdquo;",
     "&ldquo;The proposed planned development eliminates the need for individual curb cuts on Calef "
     "Rd. and preserves on-street parking.&rdquo;",
     "Carried over, and strengthened: &ldquo;reduces&rdquo; becomes &ldquo;eliminates.&rdquo;"),
    ("6", "1:58:18",
     "&ldquo;in addition to moving the entrance to one location that&rsquo;s off of Titus Avenue, "
     "<b>which is in general safer to turn on to than the busier Calef</b>&rdquo;",
     "&mdash; absent &mdash;",
     "<b>Dropped entirely.</b>"),
    ("7", "1:58:38",
     "&ldquo;this is a transitional area where there are <b>several other mixed or high density "
     "uses</b> including the large development of the south, the cemetery and the Zion school&rdquo;",
     "&ldquo;The property is located in a transitional area of large multi-family dwellings to the "
     "south, <b>with a cemetery to the west, and a school to the east</b>.&rdquo;",
     "<b>Altered, and expanded.</b> &ldquo;Mixed or high density uses&rdquo; becomes &ldquo;large "
     "multi-family dwellings.&rdquo; The compass directions for the cemetery and the school were "
     "not stated at the hearing."),
    ("8", "1:58:59",
     "&ldquo;<b>also I am a real estate broker</b>, and I&rsquo;m not aware of any circumstance "
     "where a development of this nature in Manchester has diminished a property around it. "
     "I&rsquo;ve never seen a report or evidence of that. In general, reasonably well thought out "
     "development increases values&rdquo;",
     "&mdash; absent &mdash;",
     "<b>Dropped entirely.</b> This was the only material before the Board on the effect of the "
     "proposal upon surrounding property values."),
    ("9", "1:59:17",
     "&ldquo;<b>I think a tremendous amount of thought has been put into this, further evidenced "
     "by</b> the applicant taking an additional month to rework and reduce counts&rdquo;",
     "&ldquo;The applicant reworked the plan to eliminate several counts.&rdquo;",
     "Carried over as a bare fact. The inference drawn from it at the hearing &mdash; that the "
     "rework evidenced thought &mdash; is gone."),
]

CRITERIA = [
    ("(A) not contrary to the public interest",
     "&ldquo;this variance is not contrary to the public interest&rdquo;", "1:59:27"),
    ("(B) the spirit of the ordinance is observed",
     "&ldquo;the spirit of this ordinance is observed&rdquo;", "1:59:29"),
    ("(C) substantial justice is done",
     "&ldquo;no one&rsquo;s going to benefit more from a denial than the applicant will from the "
     "approval&rdquo;", "1:59:31"),
    ("(D) values of surrounding properties are not diminished",
     "&ldquo;I don&rsquo;t believe the value of any surrounding properties will be diminished&rdquo;",
     "1:59:35"),
    ("(E) literal enforcement would result in unnecessary hardship",
     "&ldquo;I do believe literal enforcement creates an unnecessary hardship for the "
     "applicant&rdquo;", "1:59:39"),
]

rows = "\n".join(
    '<tr><td class="n">%s</td><td class="t">%s</td><td>%s</td><td>%s</td><td class="c">%s</td></tr>'
    % (n, ts, oral, written, change) for n, ts, oral, written, change in ROWS)

crit = "\n".join(
    '<tr><td class="k">%s</td><td>%s <span class="t">(%s)</span></td>'
    '<td class="c"><b>No finding.</b></td></tr>' % (k, spoken, ts) for k, spoken, ts in CRITERIA)

HTML = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Findings Compared &mdash; ZBA2026-063</title>
<style>
@page { size: letter landscape; margin:0.6in 0.55in; }
body { margin:0; color:#000; font-size:9.6px; line-height:1.45;
  font-family:"Times New Roman",Times,Georgia,serif; }
h1 { font-size:13px; margin:0 0 2px; text-align:center; }
h2 { font-size:10.6px; margin:16px 0 5px; border-bottom:1px solid #000; padding-bottom:2px;
  break-after:avoid; }
h2.brk { break-before:page; margin-top:0; }
table { break-inside:auto; }
tr { break-inside:avoid; }
.sub { text-align:center; font-size:9.4px; margin:0 0 3px; }
.note { text-align:center; font-size:8.8px; color:#444; margin:0 0 12px; font-style:italic; }
table { width:100%; border-collapse:collapse; margin-bottom:4px; }
th { background:#e9e9e9; font-size:9px; text-align:left; padding:4px 5px;
  border:0.5px solid #999; }
td { padding:4px 5px; border:0.5px solid #999; vertical-align:top; }
td.n { width:2.2%; text-align:center; color:#555; }
td.t { width:5%; font-size:8.6px; color:#555; white-space:nowrap; }
td.c { width:25%; }
td.k { width:26%; }
p { margin:0 0 7px; text-align:justify; }
.small { font-size:8.8px; color:#333; }
</style></head><body>

<h1>FINDINGS OF FACT COMPARED</h1>
<p class="sub"><b>Case No. ZBA2026-063 &mdash; 26 Titus Avenue</b><br>
What was recited and voted upon on September 10, 2026, against the written
Variance Notice of Decision signed September 14, 2026</p>
<p class="note">Left column quoted from a machine transcript of the City&rsquo;s recording and to be
verified against it. Right column quoted from the Notice of Decision.</p>

<h2>I. The nine findings recited at the hearing</h2>
<table>
<tr><th class="n"></th><th class="t">Time</th><th>Recited at the hearing and voted upon</th>
<th>In the written Notice of Decision</th><th>What changed</th></tr>
@@ROWS@@
</table>
<p class="small">Three of the nine were dropped outright. Three more were altered. The written
decision adds one detail &mdash; the compass positions of the cemetery and the school &mdash; that
was not stated at the hearing.</p>

<h2 class="brk">II. The five statutory criteria</h2>
<p>At the close of the recitation the Vice Chair stated a conclusion upon each of the five criteria
of RSA 674:33, I(a)(2). None of the five appears in the written decision.</p>
<table>
<tr><th class="k">Criterion</th><th>Stated at the hearing</th><th class="c">In the written Notice of Decision</th></tr>
@@CRIT@@
</table>

<h2>III. Three further differences on the face of the decision</h2>
<p><b>Conditions.</b> The Notice of Decision carries a printed field reading
&ldquo;Condition(s):&rdquo; followed by a blank line. It is blank. No condition was attached at the
hearing either; the two records agree, and the agreement is the point.</p>
<p><b>Explanation.</b> The printed field reading &ldquo;Explanation:&rdquo; is likewise blank.</p>
<p><b>The documents relied upon.</b> The decision grants relief &ldquo;as per documents submitted
through June 22, 2026,&rdquo; while finding as a fact that &ldquo;[t]he applicant reworked the plan
to eliminate several counts.&rdquo; The Zoning Review of June 25, 2026 identified nine sections
requiring relief; six were granted.</p>

<h2>IV. Summary</h2>
<p>Of the nine findings recited and voted upon, five reach the written decision, three are absent,
and three of the five that survive are materially altered. Every conclusion upon the statutory
criteria is absent. The written decision states five facts about the property and the application,
and does not state that any criterion of RSA 674:33, I(a)(2) is satisfied.</p>
<p class="small">Prepared for the Movants in ZBA2026-063. Source documents: the City&rsquo;s
recording of the September 10, 2026 public hearing; Variance Notice of Decision, Case ZBA2026-063,
signed by Chairman Robert Breault, September 14, 2026.</p>

</body></html>"""
HTML = HTML.replace("@@ROWS@@", rows).replace("@@CRIT@@", crit)

open(OUT, "w").write(HTML)
print("wrote", OUT, len(HTML), "bytes")
