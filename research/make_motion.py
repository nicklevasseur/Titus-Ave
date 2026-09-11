#!/usr/bin/env python3
"""Motion for Rehearing, RSA 677:2. Writes HTML; print to PDF with Chromium.
Bracketed yellow text marks a blank that must be filled before filing."""
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "motion.html")

HTML = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Motion for Rehearing &mdash; ZBA2026-063</title>
<style>
@page { margin:1in 1in 0.9in; }
* { box-sizing:border-box; }
body { margin:0; background:#fff; color:#000; font-size:11.6px; line-height:1.62;
  font-family:"Times New Roman",Times,Georgia,serif; }
.ctr { text-align:center; }
.cap { font-weight:700; letter-spacing:.02em; }
.caprule { border-bottom:1.5px solid #000; margin:9px 0 12px; }
h2 { font-size:11.9px; margin:15px 0 5px; text-transform:none; break-after:avoid; }
h3 { font-size:11.6px; margin:12px 0 4px; font-weight:700; break-after:avoid; }
p { margin:0 0 8px; text-align:justify; }
.pnum { margin:0 0 8px; text-align:justify; }
ol.g { margin:0; padding-left:0; list-style:none; }
ol.g > li { margin:0 0 9px; }
blockquote { margin:7px 0 9px 30px; padding:0; font-size:11.2px; }
blockquote p { margin:0 0 5px; }
.blank { background:#ffe98a; padding:0 2px; }
.sig { margin-top:26px; break-inside:avoid; }
.sigline { margin-top:34px; }
.small { font-size:10.6px; }
i { font-style:italic; }
hr.s { border:none; border-top:1px solid #000; margin:14px 0; }
.cert { margin-top:20px; break-inside:avoid; }
</style></head><body>

<p class="ctr cap">CITY OF MANCHESTER, NEW HAMPSHIRE<br>ZONING BOARD OF ADJUSTMENT</p>
<div class="caprule"></div>
<p class="ctr"><b>In re Case No. ZBA2026-063 &mdash; 26 Titus Avenue (Tax Map 554, Lot 17C)</b><br>
R-1B Zoning District, Ward 9</p>
<p class="ctr cap" style="margin-top:12px">MOTION FOR REHEARING<br>
<span style="font-weight:400">Pursuant to RSA 677:2</span></p>
<div class="caprule"></div>

<p>NOW COME Nickolas J. Levasseur and Alison Famisan-Levasseur of 30 Mystic Street, Manchester,
New Hampshire 03103<span class="blank">[, and the abutters identified in Exhibit A,]</span> and
respectfully move that this Board grant a rehearing of its decision of September 10, 2026 granting
the variances requested in the above-captioned case. In support of this motion, and in satisfaction
of RSA 677:2, the Movants set forth below every ground upon which it is claimed that the decision
is unlawful or unreasonable.</p>

<h2>I. STANDING AND TIMELINESS</h2>

<p class="pnum">1. The Movants own and reside at 30 Mystic Street, Manchester. Their property
<span class="blank">[abuts / lies within 200 feet of]</span> the subject parcel and they are
abutters within the meaning of RSA 672:3. They appeared and gave testimony in opposition at the
public hearing on September 10, 2026. They are persons directly affected by the decision within
the meaning of RSA 677:2.</p>

<p class="pnum">2. The Board rendered its decision on September 10, 2026. This motion is filed
within thirty days of that decision and is therefore timely under RSA 677:2. The Movants note that
as of the date of filing the City has published neither minutes nor a notice of decision for the
September 10, 2026 meeting, and that the Movants have not been served with any written decision.</p>

<p class="pnum">3. The Movants set forth each ground fully and separately below, mindful that under
RSA 677:3, I, no ground not set forth in this motion may later be urged upon appeal.</p>

<h2>II. THE DECISION COMPLAINED OF</h2>

<p class="pnum">4. The applicant, T &amp; L 2018, LLC, by its agent Doug MacGuire, P.E., of The
Dubay Group, Inc., sought relief to construct two townhouse buildings containing thirteen
multifamily dwelling units on a lot having 49,484 square feet of buildable area where 78,000 square
feet is required for the use proposed.</p>

<p class="pnum">5. On September 10, 2026 the Board granted relief from six sections of the Land Use
Code: &sect;4.3-A.1.C (Multifamily Dwellings); &sect;8.1.2 (Planned Development Lot Area);
&sect;5.3.1.E (Townhouse Building Type &mdash; Districts Permitted); &sect;5.3.1.E.5.B (Maximum
Height in Stories); &sect;5.3.1.E.5.C (Maximum Height in Feet); and &sect;8.7.2.F.2 (Parking
Location for Planned Developments). The vote was four to one, Member Carnevale dissenting. No
condition was attached to the grant.</p>

<h2>III. THE GOVERNING STANDARD</h2>

<p class="pnum">6. A variance may be granted only upon affirmative findings on all five criteria of
RSA 674:33, I(a)(2)(A) through (E). The burden of proof on every criterion rests upon the
applicant, and upon the applicant alone. <i>Harrington v. Town of Warner</i>, 152 N.H. 74, 78
(2005). A failure of proof on any one criterion requires denial.</p>

<p class="pnum">7. A board&rsquo;s findings must rest upon evidence in the record and not upon the
personal opinion or private knowledge of its members. <i>Condos East Corp. v. Town of Conway</i>,
132 N.H. 431, 434 (1989).</p>

<p class="pnum">8. &ldquo;Unnecessary hardship&rdquo; under RSA 674:33, I(b) requires special
conditions of <i>the property</i> that distinguish it from other properties in the area. Conditions
personal to the owner, and the owner&rsquo;s preferred or more profitable use, are not special
conditions of the land. <i>Bacon v. Town of Enfield</i>, 150 N.H. 468, 471 (2004); <i>Olszak v.
Town of New Hampton</i>, 139 N.H. 723, 726 (1995).</p>

<h2>IV. GROUNDS FOR REHEARING</h2>

<h3>Ground 1. The findings upon which the decision rests were recited by a single member,
adopted without deliberation, and are the Board&rsquo;s stated basis for the grant.</h3>

<p class="pnum">9. At the close of the hearing the Chair asked Vice Chair St. Pierre to state the
findings of fact. He did so, speaking without interruption for approximately two minutes, and then
immediately moved that relief be granted from all six sections. The motion was seconded and carried
four to one.</p>

<p class="pnum">10. No other member stated findings. No other member discussed the findings recited.
When one member asked him to repeat a point because he was &ldquo;going really fast,&rdquo; he
answered &ldquo;I got you later&rdquo; and continued. The point was not repeated, and the findings
were never read back or deliberated upon before the vote.</p>

<p class="pnum">11. Those statements are therefore not stray commentary from the bench. They are the
findings of fact the Board adopted, by the same vote that granted the relief, and they are the only
statement of reasons the record contains. If the findings are unsupported by the record, or are
contradicted by it, the decision they were given to justify cannot stand.</p>

<h3>Ground 2. The applicant offered no evidence whatever on RSA 674:33, I(a)(2)(D), and the only
evidence supporting that finding was supplied from the bench by the member who recited it.</h3>

<p class="pnum">12. Member Carnevale asked the applicant directly whether it had obtained a broker
price opinion to support its assertion that surrounding property values would not be diminished.
The applicant&rsquo;s engineer answered: &ldquo;so no, we did not,&rdquo; and offered to obtain one
if the Board wished. The Board did not ask him to do so.</p>

<p class="pnum">13. The applicant produced no appraisal, no market study, no comparable sale, and no
opinion of any person qualified to give one. Its entire written submission on this criterion is
that there is &ldquo;ample buffering&rdquo; and that the project &ldquo;would not negatively affect
surrounding existing properties.&rdquo; The buffer relied upon is approximately 130 to 135 feet of
woods lying upon the rear yards of the Mystic Street owners, land the applicant does not own and
which its own engineer conceded those owners &ldquo;have the right to develop&hellip; or expand&hellip;
or cut.&rdquo;</p>

<p class="pnum">14. Approximately eight minutes after that concession, and in the course of reciting
the findings of fact, Vice Chair St. Pierre stated:</p>
<blockquote><p>&ldquo;Also, I am a real estate broker, and I&rsquo;m not aware of any circumstance
where a development of this nature in Manchester has diminished a property around it. I&rsquo;ve
never seen a report or evidence of that. In general, reasonably well thought out development
increases values.&rdquo;</p></blockquote>

<p class="pnum">15. This was not evidence. It was not given under oath. The Movants had no
opportunity to cross-examine it, to offer a contrary opinion, or to inquire into its basis. It
rested upon the member&rsquo;s professional standing and private experience rather than upon
anything in the record. A board&rsquo;s findings must rest upon evidence in the record and not upon
the personal opinion or private knowledge of its members. <i>Condos East Corp. v. Town of Conway</i>,
132 N.H. 431, 434 (1989).</p>

<p class="pnum">16. The defect is not merely that opinion took the place of evidence. A member
furnished the very proof the applicant had conceded, minutes earlier, that it did not possess; he
then recited it as a finding of fact; he then moved to grant the relief; and he then voted upon the
sufficiency of what he had himself supplied. The applicant&rsquo;s burden under <i>Harrington</i>
was not carried. It was relieved.</p>

<p class="pnum">17. That this was material is established by the record itself. The dissenting
member had put the question of property-value evidence to the applicant directly and received the
answer that none existed. The criterion was live, it was contested, and the only material before
the Board upon it came from a member of the Board.</p>

<h3>Ground 3. The findings adopted by the Board are contradicted by the testimony given at the same
hearing, or rest upon matter not in the record.</h3>

<p class="pnum">18. The findings recited and adopted include the following. Each is set against what
the record before the Board actually contained.</p>

<p class="pnum">19. <b>On-street parking.</b> The findings state that the plan &ldquo;reduces the
need for curb cuts on Calef Road and preserves existing on street parking.&rdquo; Two witnesses had
told the Board there is no on-street parking on Calef Road to preserve. Kate Markey: &ldquo;Anything
south of that, you&rsquo;ll notice if you drive there, there&rsquo;s big no parking signs.&rdquo;
Jennifer Allard: &ldquo;No one can park on Calef. You&rsquo;re not allowed to park on Calef.&rdquo;</p>

<p class="pnum">20. <b>The twenty-five foot buffer.</b> The findings credit the quieting of title on
the paper street as creating additional buffers. Jennifer Allard had testified: &ldquo;I actually
got a lawyer and went to court and we won our half of the street. They didn&rsquo;t give us a half
of the street. We won our half, they got the other half. So they didn&rsquo;t give us
anything.&rdquo;</p>

<p class="pnum">21. <b>The cemetery as a high density use.</b> The findings recite &ldquo;several
other mixed or high density uses including the large development to the south, the cemetery and the
Zion School.&rdquo; A cemetery is not a high density use, and the applicant&rsquo;s own engineer
had told the Board that as to the cemetery &ldquo;obviously no homes or anything will be built
really in that area.&rdquo;</p>

<p class="pnum">22. <b>The enforced buffer.</b> The findings rely upon an &ldquo;enforced
buffer&rdquo; and upon &ldquo;additional buffers&hellip; beyond what the plan development requires
in itself.&rdquo; No landscape plan and no buffer design was submitted with the application. The
City&rsquo;s Zoning Review records a Type 2 buffer as &ldquo;Can comply,&rdquo; which states a
possibility and not a proposal. An abutter had asked the Board minutes earlier: &ldquo;There&rsquo;s
no plan that shows how far back he&rsquo;s going to go. Is he going to go right up to that 25 feet
and take all the trees there?&rdquo;</p>

<p class="pnum">23. <b>Uniqueness measured against the member&rsquo;s own experience.</b> The Vice
Chair stated: &ldquo;I don&rsquo;t think we&rsquo;ve ever seen in my years on zoning another
instance of properties that organically have such a large buffer.&rdquo; A comparison to every
other case a member has heard is private knowledge. It cannot be examined, contradicted, or
tested, and it was offered as the ground for finding the parcel unique.</p>

<p class="pnum">24. <b>Uniqueness of size.</b> The findings state the parcel &ldquo;is singularly
unique in its size at 1.1 acre.&rdquo; Nothing in the record compares this parcel to others in the
area. The applicant&rsquo;s own exhibit describes the development across the street as
approximately two acres, which is larger. A larger parcel also cuts against hardship rather than
for it.</p>

<p class="pnum">25. <b>Traffic safety.</b> The Vice Chair stated that &ldquo;by removing curb cuts
into Calef, I think we improve safety tremendously,&rdquo; and found the entrance to be
&ldquo;off of Titus Avenue, which is in general safer to turn on to than the busier Calef.&rdquo;
No traffic count, sight-distance analysis, crash history, or professional opinion of any kind
appears in the file. The comparison between the two streets was made by no witness.</p>

<p class="pnum">26. <b>Slope.</b> The findings recite &ldquo;a lot of slopes, including 18% that
is undevelopable based on the city&rsquo;s calculation of the slope review,&rdquo; and the parcel
was found to have &ldquo;very unique characteristics&rdquo; on that footing. The figure is the
City&rsquo;s ordinary lot-area arithmetic. The Zoning Review for this application begins at 60,406
square feet of gross lot area, deducts 10,922 square feet of slope, and carries 49,484 square feet
forward as buildable area. The deducted figure is 18.08% of the gross. It is not a finding, a
study, or a measurement peculiar to this parcel; it is the arithmetic the Code
<span class="blank">[&sect;______]</span> prescribes for computing buildable lot area on every
sloped parcel in the City, applied here as it is applied everywhere.</p>

<p class="pnum">27. That arithmetic cannot bear the weight the finding placed upon it, for three
reasons. First, excluding sloped ground from the buildable-area computation is not a determination
that the ground is undevelopable or that the parcel is burdened; it is the measurement by which the
Code decides how much of a lot counts. Second, what the measurement left is not a constrained
remainder: 49,484 square feet is more than eight times the 6,000 square feet the Code requires per
planned-development unit, and roughly two and a half times the 20,000 square feet that five
conforming single-family lots would require. Third, the applicant&rsquo;s own By-Right Subdivision
Plan was drawn upon this same land after this same deduction, and still yields five conforming
lots. A deduction that leaves a parcel abundantly buildable, and that the applicant&rsquo;s own
engineer worked around successfully on paper, identifies no special condition of the land within
the meaning of RSA 674:33, I(b). <i>Bacon v. Town of Enfield</i>, 150 N.H. 468, 471 (2004).</p>

<p class="pnum">28. <b>Tests the statute does not contain.</b> The Vice Chair stated &ldquo;I do
believe this is the best plan for this lot,&rdquo; and framed his weighing as a comparison between
the proposal and a conforming five-lot subdivision: &ldquo;if they&rsquo;re allowed to do&hellip;
those five houses, is that more in benefit of safety? Is it more benefit of the neighbors, of the
spirit?&rdquo; Whether a proposal is the best available plan, and which of two lawful developments
a board would prefer, are not among the five criteria. The question under RSA 674:33, I(b)(2) is
whether the property can be reasonably used in conformance with the ordinance.</p>

<p class="pnum">29. These are not incidental remarks. They span four of the five statutory criteria,
they constitute the whole of the Board&rsquo;s stated reasoning, and the decision was voted
immediately upon their recitation without any other member offering findings of his or her own.</p>

<h3>Ground 4. No special condition of the property was identified, and the hardship claim is
contradicted by the applicant&rsquo;s own sealed exhibit.</h3>

<p class="pnum">30. The applicant&rsquo;s written memorandum states that the parcel &ldquo;can
support five (5) single family home lots meeting the underlying zoning.&rdquo; Its By-Right
Subdivision Plan, submitted with the application, depicts five conforming lots, each having more
than the 6,000 square feet of buildable area the ordinance requires.</p>

<p class="pnum">31. At the hearing the applicant told the Board the opposite. Its engineer asked:
&ldquo;If you could have nine single family homes here by right and you can&rsquo;t get more than
one or two, is that a reasonable use of the property?&rdquo; Its principal stated: &ldquo;the
hardship is the steep slopes. We can&rsquo;t essentially build the houses.&rdquo;</p>

<p class="pnum">32. No drawing, grading analysis, soils report, or cost estimate was offered in
support of the oral claim. Minutes earlier the same engineer had conceded that the arithmetic runs
the other way: &ldquo;this lot would support more than what we&rsquo;re showing here, just
physically based on buildable area divided by 6,000.&rdquo;</p>

<p class="pnum">33. The Board was asked to disbelieve the applicant&rsquo;s own stamped plan upon
the applicant&rsquo;s unsupported say-so, and did so. A finding of unnecessary hardship that rests
upon an assertion the applicant&rsquo;s own submitted exhibit refutes is unreasonable.</p>

<p class="pnum">34. Further, the only physical feature identified &mdash; slope &mdash; is not a
special condition distinguishing this parcel. The City&rsquo;s Zoning Review deducted 10,922 square
feet of slope from 60,406 square feet gross, leaving 49,484 square feet of buildable area. That is
the ordinance operating as written. It leaves more than eight times the 6,000 square feet the
ordinance requires per planned-development unit. A deduction that leaves a parcel abundantly
buildable is not a hardship arising from special conditions of the land within the meaning of RSA
674:33, I(b). <i>Bacon</i>, 150 N.H. at 471.</p>

<p class="pnum">35. What the applicant in truth advanced was that a conforming five-lot subdivision
would be less profitable or less convenient than thirteen townhouse units. That is not unnecessary
hardship. <i>Olszak</i>, 139 N.H. at 726. The applicant acquired the parcel as vacant land at
public auction in 2024, a circumstance the Board may weigh. <i>Hill v. Town of Chester</i>, 146
N.H. 291, 294 (2001).</p>



<h3>Ground 5. The relief granted exceeds what the ordinance&rsquo;s own planned-development
standard permits, and that standard was never addressed.</h3>

<p class="pnum">36. Section 8.1.2 requires 6,000 square feet of lot area per planned-development
unit. Upon 49,484 square feet of buildable area, that standard yields <b>eight units</b>. Thirteen
were granted.</p>

<p class="pnum">37. Neither the applicant nor the Board addressed &sect;8.1.2 on the record. The
applicant argued instead from the standards of the R-M district, under which it asserted seventeen
units would be permitted, and from the heights allowed for townhouses in districts where townhouses
are permitted. This parcel lies in neither. An argument that a parcel should be governed by the
standards of a different district is an argument for reclassification under RSA 675, a legislative
act of the Board of Mayor and Aldermen. It is not a ground for a variance, and this Board has no
jurisdiction to grant it.</p>

<h3>Ground 6. The variances are contrary to the public interest and violate the spirit of the
ordinance, RSA 674:33, I(a)(2)(A) and (B).</h3>

<p class="pnum">38. The stated intent of the R-1B district under Table 3.3-A of the Land Use Code
is &ldquo;to maintain higher-density neighborhoods of single-family, detached dwellings.&rdquo; The
applicant quoted the first half of that sentence and omitted the operative half.</p>

<p class="pnum">39. The findings describe the area as a &ldquo;transitional area.&rdquo; That is not
a designation this parcel carries. Table 3.3-A assigns the transitional role to the R-2 district,
which &ldquo;forms a loose band around the more densely developed areas of the City, transitioning
between mixed-use centers and the lower densities of the single-family districts.&rdquo; Deciding
the case as though the parcel were in R-2 applies the wrong district&rsquo;s purpose.</p>

<p class="pnum">40. Granting a use the district does not permit, in a building type the district
does not permit, at a density twice what the planned-development standard allows, upon a lot with
63% of the required area, alters the essential character of the locality and conflicts with the
ordinance&rsquo;s basic objectives to a marked degree.</p>

<h3>Ground 7. Substantial justice was not weighed, RSA 674:33, I(a)(2)(C).</h3>

<p class="pnum">41. The applicant&rsquo;s entire written showing on this criterion is that
&ldquo;[t]he benefits to the applicant in constructing residential which is far more conducive to
the property provides substantial justice.&rdquo; The governing question is whether any loss to the
individual is outweighed by a gain to the general public. The applicant weighed only its own
benefit, which is the one interest this criterion does not measure. The showing is also
self-defeating: on the applicant&rsquo;s own plan the parcel yields five conforming lots, so there
is no loss to weigh.</p>

<h3>Ground 8. Preserved: the Board applied a different standard to comparable applications heard
the same evening.</h3>

<p class="pnum">42. The Movants state this ground to preserve it under RSA 677:3, I, and do not
urge it as the principal basis for rehearing.</p>

<p class="pnum">43. In Case No. ZBA2026-078 (26 Sullivan Street), heard the same evening, the Board
declined to vote upon requested variances because an elevation on the applicant&rsquo;s plan set
was mislabeled, a member stating that he was &ldquo;not comfortable voting on anything that&rsquo;s
been represented here on paper&rdquo; and &ldquo;not comfortable&hellip; granting variances on
something that&rsquo;s incomplete.&rdquo; The case was continued. In the present case the
applicant&rsquo;s oral hardship claim was contradicted by its own sealed subdivision plan, and no
continuance was sought or granted.</p>

<p class="pnum">44. In Case No. ZBA2026-080 (374 Thornton Street), also heard the same evening, the
same slope provision reduced a parcel to 1,812 square feet of buildable area out of 13,955 square
feet gross &mdash; a deduction of 87% &mdash; and relief was required because the remainder fell
below the minimum. Here the deduction was 18% and left 49,484 square feet. The applicant in that
case stated in its written narrative that &ldquo;[t]he intent of the steep slope section of the
ordinance is to prevent creating lots that cannot be built on.&rdquo;</p>

<p class="pnum">45. The Board conditioned its grants that evening in cases far smaller than this
one, including hours of illumination for signage and vegetative screening of retaining walls. The
present grant, the largest of the evening, carries no condition of any kind.</p>

<h2>V. THE RECORD</h2>

<p class="pnum">46. The Movants incorporate by reference the complete case file in ZBA2026-063,
including the application, the Zoning Review, the By-Right Subdivision Plan, the applicant&rsquo;s
memorandum of May 20, 2026, and the City&rsquo;s audio and video recording of the public hearing of
September 10, 2026. Quotations above are drawn from that recording. The Movants have requested the
recording and the written decision under RSA 91-A and reserve the right to supplement this motion
upon their production.</p>

<h2>VI. RELIEF REQUESTED</h2>

<p>WHEREFORE, the Movants respectfully request that this Board:</p>

<p class="pnum">A. Grant a rehearing of its decision of September 10, 2026 in Case No.
ZBA2026-063;</p>
<p class="pnum">B. Upon rehearing, require the applicant to carry its burden on each of the five
criteria of RSA 674:33, I(a)(2), and in particular to produce competent evidence on the effect of
the proposal upon surrounding property values;</p>
<p class="pnum">C. Require that any finding of unnecessary hardship identify the special condition
of the property relied upon, and reconcile that finding with the applicant&rsquo;s own By-Right
Subdivision Plan;</p>
<p class="pnum">D. Address &sect;8.1.2 of the Land Use Code and state the basis for any relief
exceeding eight dwelling units;</p>
<p class="pnum">E. State, upon the record, the evidentiary basis for each finding of fact adopted in support of
any grant, and in particular for any finding that surrounding property values will not be
diminished; and
</p>
<p class="pnum">F. Consider whether a member who supplied the only evidence upon a contested
criterion, recited it as a finding, and moved the relief, should participate in the
reconsideration of that finding; and</p>
<p class="pnum">G. Grant such further relief as is just.</p>

<div class="sig">
<p>Respectfully submitted,</p>
<div class="sigline">
<p>______________________________&emsp;&emsp;______________________________<br>
Nickolas J. Levasseur&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Alison Famisan-Levasseur<br>
30 Mystic Street, Manchester, NH 03103&emsp;&emsp;30 Mystic Street, Manchester, NH 03103</p>
<p>Dated: <span class="blank">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span>,
2026</p>
</div>
</div>

<div class="cert">
<hr class="s">
<p class="ctr"><b>CERTIFICATE OF SERVICE</b></p>
<p class="small">I certify that on <span class="blank">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span>,
2026 a copy of the foregoing was delivered to the Manchester Planning and Community Development
Department, One City Hall Plaza, Manchester, New Hampshire 03101, and served upon the applicant
T &amp; L 2018, LLC and its agent The Dubay Group, Inc., 136 Harvey Road, Building B101,
Londonderry, New Hampshire 03053, by
<span class="blank">[first class mail / hand delivery]</span>.</p>
<p class="small" style="margin-top:16px">______________________________<br>Nickolas J. Levasseur</p>
</div>

<p class="small" style="margin-top:22px; color:#444">Highlighted bracketed text marks a blank to be
completed before filing. Quotations are taken from a machine transcript of the City&rsquo;s
recording and should be verified against that recording before this motion is filed. This document
was prepared by the Movants and is not legal advice; the Movants may wish to have counsel review it
before filing.</p>

</body></html>"""

open(OUT, "w").write(HTML)
print("wrote", OUT, len(HTML), "bytes")
