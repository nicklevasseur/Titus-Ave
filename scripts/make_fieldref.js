const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
        AlignmentType, BorderStyle, ShadingType, LevelFormat, VerticalAlign, convertInchesToTwip } = require('docx');

const H1 = (num, title) => new Paragraph({
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  spacing: { before: 260, after: 100 },
  children: [ new TextRun({ text: `  ${num}. ${title}`, bold: true, size: 25, color: "FFFFFF" }) ]
});

const H2 = (text) => new Paragraph({
  spacing: { before: 100, after: 60 },
  children: [ new TextRun({ text, bold: true, size: 20, color: "8B0000" }) ]
});

const P = (text, opts={}) => new Paragraph({
  spacing: { after: 90, line: 300 },
  children: [ new TextRun({ text, size: 20, ...opts }) ]
});

const PRuns = (runs) => new Paragraph({ spacing: { after: 90, line: 300 }, children: runs });

const bullet = (runsOrText) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 70, line: 290 },
  children: typeof runsOrText === 'string' ? [ new TextRun({ text: runsOrText, size: 20 }) ] : runsOrText
});

const numbered = (runsOrText) => new Paragraph({
  numbering: { reference: "numbers", level: 0 },
  spacing: { after: 60, line: 280 },
  children: typeof runsOrText === 'string' ? [ new TextRun({ text: runsOrText, size: 19 }) ] : runsOrText
});

const cite = (text) => new TextRun({ text, italics: true, size: 20 });
const reg = (text) => new TextRun({ text, size: 20 });
const bold = (text) => new TextRun({ text, bold: true, size: 20 });

const tableHeaderCell = (text, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [ new TextRun({ text, bold: true, size: 18, color: "FFFFFF" }) ] }) ]
});
const tableCell = (text, width, bold_=false) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 50, bottom: 50, left: 100, right: 100 },
  children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [ new TextRun({ text, size: 18, bold: bold_ }) ] }) ]
});

const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.18) } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.28), hanging: convertInchesToTwip(0.24) } } } }] }
    ]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 620, bottom: 620, left: 800, right: 800 } } },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [ new TextRun({ text: "26 TITUS AVENUE — FIELD REFERENCE", bold: true, size: 30, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [ new TextRun({ text: "Facts & Citations by Criterion — Case #ZBA2026-063", bold: true, size: 20 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 160 },
        children: [ new TextRun({ text: "For personal use while canvassing — not for public distribution", italics: true, size: 16, color: "555555" }) ]
      }),

      P("The Zoning Board can only grant this variance if it finds ALL FIVE criteria below are satisfied — RSA 674:33, I(a)(2) — and the burden of proving each one is the applicant's (Harrington v. Town of Warner, 152 N.H. 74 (2005)). If even one fails, denial is required regardless of the others. This sheet gives the exact legal test for each, verified case law, and the specific facts from the application, state law, and Manchester's own ordinance that undercut it — including detail beyond what's in the public testimony/handout, for on-the-spot questions.", { bold: true }),

      P("Framing for doorstep conversations: being for more housing and against this variance is one consistent position. The City rewrote its zoning ordinance this year to get more housing built, and in doing so decided where townhouses and multifamily go. This corner isn't one of those places. The variance would undo that decision for one owner, six months later."),

      H1(1, "NOT CONTRARY TO THE PUBLIC INTEREST — RSA 674:33, I(a)(2)(A)"),
      H2("The legal standard"),
      PRuns([
        reg("A variance is “contrary to the public interest” if it would “unduly, and in a marked degree” conflict with the ordinance such that it violates the ordinance’s “basic zoning objectives.” "),
        cite("Chester Rod & Gun Club v. Town of Chester"), reg(", 152 N.H. 577, 581 (2005); "),
        cite("Harborside Assocs. v. Parade Residence Hotel"), reg(", 162 N.H. 508, 514 (2011). The Board asks two things: would the variance (a) alter the essential character of the locality, or (b) threaten public health, safety, or welfare? The basic zoning objective at issue here is the one the City itself set for this parcel: one-family residential use."),
      ]),
      H2("The facts"),
      bullet([
        bold("The ordinance is six months old. "),
        reg("The Board of Mayor and Aldermen adopted the new Manchester Land Use Code on December 16, 2025, after a public process that began in 2021, and it took effect March 1, 2026 — the ordinance the denial letter itself cites as “passed to be ordained on March 1, 2026” (case file p. 1). It was the first comprehensive rewrite since 2001, and its stated purpose was to increase the housing supply. In that rewrite the City decided, district by district, where townhouses and multifamily buildings belong. It kept this parcel, and this corner, in R-1B, Residential One-Family (case file pp. 2, 14)."),
      ]),
      bullet([
        bold("The “transition” theory is answered by the map. "),
        reg("The applicant's memo (case file p. 11, criterion 1) argues the project is a “reasonable transition” between the 96-unit Laurel Ridge complex across Titus Avenue and the single-family homes to the north. The aldermen redrew this map with full knowledge of Laurel Ridge, Mount Zion Christian School, and Pine Grove Cemetery — every one of them appears on the applicant's own Zoning Exhibit (case file p. 14) — and placed the transition at this lot line. A variance would relocate that line by private application, six months after the City drew it through the legislative process. That is a conflict with the ordinance's basic objective in the most direct sense."),
      ]),
      bullet([
        bold("The record contains no evidence on health, safety, or welfare. "),
        reg("There is no traffic, trip-generation, sight-distance, or lighting analysis anywhere in the application. The Zoning Review Sheet lists “Visibility at Intersections” (§8.4) as required with the remark “No Information” (case file p. 6) — an unaddressed standard at a corner lot on Calef Road — and marks Site Lighting Standards (§8.5) “Not Shown” (case file p. 6). The applicant's memo offers only that the neighborhood “comprises of a mix of various uses” (case file p. 11). The Planning Board would examine some of these matters at site-plan review if a variance were granted; that is precisely why the Board should not find criterion (A) satisfied now on a record that says nothing about them."),
      ]),

      H1(2, "SPIRIT OF THE ORDINANCE IS OBSERVED — RSA 674:33, I(a)(2)(B)"),
      H2("The legal standard"),
      PRuns([
        reg("Uses the same “unduly, and in a marked degree” test as public interest — the NH Supreme Court has held the two requirements are “coextensive and related.” "),
        cite("Chester Rod & Gun Club"), reg(", 152 N.H. at 580; "),
        cite("Malachy Glen Assocs. v. Town of Chichester"), reg(", 155 N.H. 102, 105–106 (2007)."),
      ]),
      H2("The facts — six variances now sought (confirmed with Planning & Community Development)"),
      PRuns([
        reg("The original denial letter and August 3, 2026 hearing notice (case file p. 1) cited "),
        bold("nine"), reg(" ordinance sections. Following a subsequent plan revision, Planning & Community Development has confirmed directly that three of those — dumpster location, parking-drive landscaping, and fence height — have been resolved and are "),
        bold("not"), reg(" being pursued at this hearing. The six sections remaining:"),
      ]),
      numbered("§4.3-A.1.C — Multifamily Dwellings (the use itself; zoning review, case file p. 2, lists this as “Not Permitted Per” this section)"),
      numbered("§8.1.2 — Planned Development Lot Area (78,000 SF required; 49,484 SF actual — a 37% shortfall; case file p. 3)"),
      numbered("§5.3.1.E — Townhouse Building Type, Districts Permitted (zoning review, case file p. 3: “N/C — Townhouse Not Allowed”)"),
      numbered("§5.3.1.E.5.B — Maximum Height in Stories (2.5 allowed; 3 proposed; case file p. 3)"),
      numbered("§5.3.1.E.5.C — Maximum Height in Feet (35 ft allowed; 38 ft proposed; case file p. 3)"),
      numbered("§8.7.2.F.2 — Parking Location for Planned Developments (8-unit building’s parking sits within 20 ft of the building; case file p. 4)"),
      new Paragraph({ text: "", spacing: { after: 60 } }),
      bullet([
        bold("Items 1 and 3 are use variances. "),
        reg("The 2010 amendment to RSA 674:33 applies one hardship test to use and dimensional variances alike, I(b)(3), but the question under this criterion is whether the relief conflicts with the ordinance's basic objectives. Overriding a district's principal permitted use and its permitted building types does so by definition. The four dimensional variances are stacked on top of that."),
      ]),
      bullet([
        bold("The new ordinance allocates this housing type elsewhere. "),
        reg("The Land Use Code assigns townhouse and multifamily building types to specific districts (Tables 4.3-A and 5.3-A). R-1B is not among them, which is why the City's reviewer marked both “Not Permitted” (case file pp. 2–3). The applicant's memo (case file p. 11, criterion 2) argues the R-1B district's “spirit” is to “provide higher density residential neighborhoods.” The district's own name — “Residential One-Family, High Density” (case file p. 2) — specifies one-family housing at higher density. Its spirit is small lots, not multifamily buildings."),
      ]),
      bullet([
        bold("Even the most permissive density rule in the ordinance yields 8 units, not 13. "),
        reg("§8.1.2 requires 6,000 SF of lot area per planned-development unit (case file p. 3: “6,000 x 13 units = 78,000”). At 49,484 SF, this parcel supports 8 units even under the planned-development standard. The applicant seeks 13 — 62% more than the land supports under any provision of the Code."),
      ]),
      bullet([
        bold("The layout depends on planned-development standards the district does not extend to it. "),
        reg("The Zoning Review marks §8.7 Planned Developments “N/C — Not Permitted within the District” (case file p. 6). The site plan nonetheless uses 10-foot side and rear setbacks (case file p. 13), where the base-district standards printed on the applicant's own Zoning Exhibit require 20-foot side and 30-foot rear yards for any “other structure or principal use” (case file p. 14, Note 2). The Board should ask staff to confirm on the record that the six sections above are the complete list of relief this layout requires. A variance granted on an incomplete list is vulnerable to appeal."),
      ]),
      bullet("The denial letter itself (case file p. 1, signed by Michael J. Landry, PE, Esq., Deputy Director of Building Regulations) states directly that the proposal “is prohibited” under these sections and that the Department has “no authority to grant this permit.” That denial predates the plan revision; the six sections above remain live."),

      H1(3, "SUBSTANTIAL JUSTICE IS DONE — RSA 674:33, I(a)(2)(C)"),
      H2("The legal standard"),
      PRuns([
        reg("“Perhaps the only guiding rule on this factor is that any loss to the individual that is not outweighed by a gain to the general public is an injustice.” "),
        cite("Malachy Glen Assocs. v. Town of Chichester"), reg(", 155 N.H. 102, 109 (2007). The Board also looks at whether the proposal is consistent with the area’s present use. Id."),
      ]),
      H2("The facts"),
      bullet("The applicant's memo (case file p. 11, criterion 3) bases “substantial justice” explicitly on the applicant's own economic benefit: “The benefits to the applicant in constructing residential which is far more conducive to the property provides substantial justice.” Private profit is not a valid basis for this finding (see Criterion 5, Olszak and Governor's Island Club, below)."),
      bullet("There is no real “loss” to weigh in the first place — the applicant's own plans (case file p. 15; see Criterion 5) show a fully conforming 5-lot alternative already exists on this same parcel. Denial costs the applicant nothing but the difference between a permitted project and a preferred one."),
      bullet("On the other side of the ledger, the gain to the general public from denial is the integrity of an ordinance the City adopted six months ago after four years of public work. The applicant's memo does not address the public side of the balance at all."),
      bullet("On consistency with the area's present use: within the R-1B district, the residential lots surrounding this parcel — along its 313-foot north line on Mystic Street, on Titus Avenue to the east, and on Calef Road — are single-family homes (case file pp. 9, 13, 14)."),

      H1(4, "VALUES OF SURROUNDING PROPERTIES NOT DIMINISHED — RSA 674:33, I(a)(2)(D)"),
      H2("The legal standard"),
      PRuns([
        reg("The applicant bears the burden of proving each of the five criteria, including that the variance will not diminish the value of surrounding properties. "),
        cite("Harrington v. Town of Warner"), reg(", 152 N.H. 74 (2005). An unsupported assertion by the applicant's own engineer does not carry that burden."),
      ]),
      H2("The facts"),
      bullet("The applicant's entire showing on this criterion is one paragraph (case file p. 12, criterion 4): there is “ample buffering” and the project “would not negatively affect surrounding existing properties.” No appraisal, market study, comparable sales, or real-estate data appears anywhere in the application. The engineer who wrote that sentence is not a licensed appraiser and cites no source for it."),
      bullet("The homes surrounding this parcel in the R-1B district — on Mystic Street along the parcel's north line, on Titus Avenue to the east, and on Calef Road — are single-family (case file p. 9, GIS parcel map; case file p. 13, site plan; case file p. 14, Zoning Exhibit). A three-story, 13-unit development placed among them is a change in the character of those streets that the applicant's memo neither quantifies nor addresses. For most of the families who own those homes, the house is the largest asset they will ever hold."),
      bullet("The only valuation data in the record is the City's assessment card (case file p. 7): the parcel is assessed as vacant residential buildable land, and it sold in July 2024 for $150,000. The applicant's own by-right plan divides it into five building lots (case file p. 15). Nothing in the record suggests the conforming use is uneconomic; the open question under this criterion is the neighbors' values, and on that the record is silent."),

      H1(5, "UNNECESSARY HARDSHIP — RSA 674:33, I(a)(2)(E), defined at I(b)(1)–(3)"),
      H2("The legal standard"),
      PRuns([
        reg("Requires EITHER (A)(i) “no fair and substantial relationship exists between the general public purposes of the ordinance provision and the specific application of that provision to the property,” AND (ii) “the proposed use is a reasonable one” — RSA 674:33, I(b)(1); OR (B) if (A) isn’t established, the property “cannot be reasonably used in strict conformance with the ordinance, and a variance is therefore necessary to enable a reasonable use of it” — RSA 674:33, I(b)(2). Both branches begin with “special conditions of the property that distinguish it from other properties in the area.” Applies identically to use and dimensional variances — I(b)(3). This unified test originates in "),
        cite("Simplex Technologies, Inc. v. Town of Newington"), reg(", 145 N.H. 727 (2001), later codified by the legislature in 2010."),
      ]),
      PRuns([
        bold("The “special conditions” must be conditions of the land itself, not of the proposed use. "),
        cite("Bacon v. Town of Enfield"), reg(", 150 N.H. 468 (2004). "),
        bold("Financial or economic hardship is not, by itself, sufficient. "),
        cite("Olszak v. Town of New Hampton"), reg(", 139 N.H. 723, 726 (1995); "),
        cite("Governor’s Island Club v. Town of Gilford"), reg(", 124 N.H. 126, 130 (1983). Nor do personal circumstances of the landowner establish hardship — "),
        cite("Ryan v. City of Manchester"), reg(", 123 N.H. 170, 174 (1983). And while purchasing with knowledge of the zoning restriction does not by itself bar a variance, it is a factor the Board may properly weigh. "),
        cite("Hill v. Town of Chester"), reg(", 146 N.H. 291 (2001)."),
      ]),
      H2("The facts — the applicant's own By-Right Subdivision Plan (case file p. 15, Sheet 3 of 3, prepared by The Dubay Group, Inc., dated May 21, 2026)"),

      new Table({
        width: { size: 9600, type: WidthType.DXA },
        columnWidths: [3200, 3200, 3200],
        rows: [
          new TableRow({ children: [ tableHeaderCell("Lot", 3200), tableHeaderCell("Total Area", 3200), tableHeaderCell("Buildable Area", 3200) ]}),
          new TableRow({ children: [ tableCell("Proposed Lot 1", 3200), tableCell("8,918 SF", 3200), tableCell("6,000 SF", 3200) ]}),
          new TableRow({ children: [ tableCell("Proposed Lot 2", 3200), tableCell("8,185 SF", 3200), tableCell("6,110 SF", 3200) ]}),
          new TableRow({ children: [ tableCell("Proposed Lot 3", 3200), tableCell("7,456 SF", 3200), tableCell("6,083 SF", 3200) ]}),
          new TableRow({ children: [ tableCell("Proposed Lot 4", 3200), tableCell("7,422 SF", 3200), tableCell("6,076 SF", 3200) ]}),
          new TableRow({ children: [ tableCell("Proposed Lot 5", 3200), tableCell("28,425 SF", 3200), tableCell("25,215 SF", 3200) ]}),
        ]
      }),
      new Paragraph({ text: "", spacing: { after: 100 } }),

      bullet([
        bold("The admission. "),
        reg("The applicant's own memo (case file p. 11, criterion 3) states outright: “The property can support five (5) single family home lots meeting the underlying zoning.” That is a direct admission, by the applicant's own licensed engineer, that a fully conforming, reasonable use exists without any variance."),
      ]),
      bullet([
        bold("The stated reasons are convenience, not hardship. "),
        reg("(case file p. 11): four of five lots would need separate curb cuts on Calef Road; the site would need grading “built” into the slope for the single-family option; and, again, “the benefits to the applicant.”"),
      ]),
      bullet([
        bold("Branch (A) fails because the applicant identifies no special condition of the land. "),
        reg("The memo's entire answer to (A)(i) (case file p. 12) is that the townhouses “fit well into the neighborhood while providing reasonable density in-kind with the area.” That is a statement about the proposed use and the surrounding neighborhood, not about this land — exactly what Bacon says does not count. The only physical feature the applicant mentions anywhere is slope, and the applicant's own by-right plan places five house lots on that slope. The general purpose of confining R-1B to one-family dwellings is to keep one-family neighborhoods one-family. Applying that provision to a parcel bordered on its longest side by single-family homes is the provision doing precisely its job; the relationship between purpose and application is as fair and substantial as it gets. To the extent the applicant relies on the parcel's “setting” near Laurel Ridge and the school, see Harborside, 162 N.H. at 514 (a property's setting may be a special condition), that setting is the one the City evaluated six months ago when it chose to keep this parcel in R-1B."),
      ]),
      bullet([
        bold("Branch (B) fails on the applicant's own plan. "),
        reg("The property plainly can be reasonably used in strict conformance — the applicant's own engineer drew the plan proving it (case file p. 15)."),
      ]),
      bullet([
        bold("The applicant bought a single-family lot. "),
        reg("T&L 2018, LLC purchased this parcel from the City of Manchester Parks & Recreation Department on July 17, 2024, for $150,000, as vacant residential land in the R-1B district (case file p. 7). Under Hill, that does not bar the application, but the Board may weigh it: the applicant acquired a one-family parcel at a one-family price and now asks the Board to make it something else."),
      ]),
      bullet("The hardship inquiry turns on whether a reasonable use exists under the ordinance as written, not on which use would be most advantageous to the owner. Simplex, 145 N.H. 727; Olszak, 139 N.H. at 726."),

      H1("A", "APPENDIX — QUICK CASE LAW INDEX"),
      bullet("RSA 674:33, I(a)(2)(A)–(E) — the five statutory criteria"),
      bullet("RSA 674:33, I(b)(1)–(3) — definition of unnecessary hardship"),
      bullet("Harrington v. Town of Warner, 152 N.H. 74 (2005) — applicant bears the burden of proof on all five criteria"),
      bullet("Simplex Technologies, Inc. v. Town of Newington, 145 N.H. 727 (2001) — unified hardship standard, later codified"),
      bullet("Bacon v. Town of Enfield, 150 N.H. 468 (2004) — “special conditions” refers to the land itself, not the proposed use"),
      bullet("Olszak v. Town of New Hampton, 139 N.H. 723, 726 (1995) — financial hardship insufficient alone"),
      bullet("Governor’s Island Club v. Town of Gilford, 124 N.H. 126, 130 (1983) — same principle, earlier case"),
      bullet("Ryan v. City of Manchester, 123 N.H. 170, 174 (1983) — personal circumstances ≠ hardship"),
      bullet("Hill v. Town of Chester, 146 N.H. 291 (2001) — purchase with knowledge is not a bar, but a factor the Board may weigh"),
      bullet("Chester Rod & Gun Club v. Town of Chester, 152 N.H. 577, 581 (2005) — “unduly, in a marked degree” test"),
      bullet("Harborside Assocs. v. Parade Residence Hotel, 162 N.H. 508, 514 (2011) — applies test under current statute; a property's setting may be a “special condition”"),
      bullet("Malachy Glen Assocs. v. Town of Chichester, 155 N.H. 102 (2007) — public interest/spirit test; substantial justice test"),

      H1("B", "APPENDIX — MANCHESTER LAND USE CODE CITATIONS"),
      bullet("Adopted by the Board of Mayor and Aldermen December 16, 2025; effective March 1, 2026 (case file p. 1). First comprehensive rewrite since 2001; process began 2021."),
      bullet("§4.3-A.1.C and Table 4.3-A — principal uses by district; Multifamily Dwellings not permitted in R-1B (case file p. 2)."),
      bullet("§5.3.1.E and Table 5.3-A — principal building types by district; Townhouse not permitted in R-1B (case file p. 3)."),
      bullet("§5.3.1.E.5.B/C — maximum height, 2.5 stories / 35 ft (case file p. 3)."),
      bullet("§8.1.2 — planned-development lot area, 6,000 SF per unit (case file p. 3)."),
      bullet("§8.7 — Planned Developments; marked “Not Permitted within the District” (case file p. 6). §8.7.2.F.2 — parking location (case file p. 4)."),
      bullet("§8.4 Visibility at Intersections (“No Information”) and §8.5 Site Lighting (“Not Shown”) (case file p. 6)."),
      bullet("(The original denial letter and August hearing notice cited three additional sections — §5.6.5.D, §8.1.4, §8.2.4-A — resolved by a subsequent plan revision and confirmed by Planning & Community Development as no longer pursued.)"),

      H1("C", "APPENDIX — WHAT THE RECORD DOES NOT CONTAIN"),
      P("The burden on every criterion is the applicant's. On the following points the application offers no evidence at all:"),
      bullet("Any traffic, trip-generation, or sight-distance analysis (criterion A); §8.4 intersection visibility is marked “No Information.”"),
      bullet("Any lighting plan (criterion A); §8.5 is marked “Not Shown.”"),
      bullet("Any appraisal, market study, or comparable-sales data on surrounding property values (criterion D)."),
      bullet("Any identified special condition of the land itself (criterion E)."),
      bullet("Any explanation of why the conforming five-lot plan the applicant drew is not a reasonable use (criterion E)."),
      P("Some of the first two items would be examined at Planning Board site-plan review if a variance were granted. That is the point: the applicant asks this Board to find, now, that criteria (A) and (D) are satisfied on a record that contains nothing on them."),

      H1("D", "APPENDIX — QUICK CONTACTS"),
      bullet("Manchester Planning & Community Development: pcd@manchesternh.gov"),
      bullet("Ward 9 Alderman Jim Burkush — (603) 714-0283, jburkush@manchesternh.gov"),
      bullet("Alderman At-Large June Trisciani — (603) 502-7800, jtrisciani@manchesternh.gov"),
      bullet("Alderman At-Large Dan O’Neil — (603) 668-9814, doneil@manchesternh.gov"),
      bullet("Neighborhood contacts: Nick Levasseur (603) 361-3828 | Jen Allard (603) 661-2555"),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Field_Reference.docx', buf));
