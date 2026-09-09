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
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
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
        children: [ new TextRun({ text: "26 TITUS AVENUE \u2014 FIELD REFERENCE", bold: true, size: 30, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [ new TextRun({ text: "Facts & Citations by Criterion \u2014 Case #ZBA2026-063", bold: true, size: 20 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 160 },
        children: [ new TextRun({ text: "For personal use while canvassing \u2014 not for public distribution", italics: true, size: 16, color: "555555" }) ]
      }),

      P("The Zoning Board can only grant this variance if it finds ALL FIVE criteria below are satisfied \u2014 RSA 674:33, I(a)(2). If even one fails, denial is required regardless of the others. This sheet gives the exact legal test for each, verified case law, and the specific facts from the application, state law, and Manchester's own ordinances that undercut it \u2014 including detail beyond what's in the public testimony/handout, for on-the-spot questions.", { bold: true }),

      H1(1, "NOT CONTRARY TO THE PUBLIC INTEREST \u2014 RSA 674:33, I(a)(2)(A)"),
      H2("The legal standard"),
      PRuns([
        reg("A variance is only \u201Ccontrary to the public interest\u201D if it would \u201Cunduly, and in a marked degree\u201D conflict with the ordinance such that it violates the ordinance\u2019s \u201Cbasic zoning objectives.\u201D "),
        cite("Chester Rod & Gun Club v. Town of Chester"), reg(", 152 N.H. 577, 581 (2005); "),
        cite("Harborside Assocs. v. Parade Residence Hotel"), reg(", 162 N.H. 508, 514 (2011). The Board asks two things: would the variance (a) alter the essential character of the locality, or (b) threaten public health, safety, or welfare? \u201CMere conflict with the terms of the ordinance is insufficient.\u201D Harborside at 514."),
      ]),
      H2("The facts"),
      bullet("No traffic study, parking study, or lighting study anywhere in the application."),
      bullet("Only 20 parking spaces proposed for 13 units \u2014 potentially 40+ residents."),
      bullet("The zoning review sheet requires Site Lighting Standards (\u00A78.5) but marks it \u201CNot Shown,\u201D with the reviewer noting only \u201CCan Comply\u201D \u2014 unverified, not confirmed."),
      bullet("Manchester Site Plan Regs \u00A79.1(A)(1) exempts only \u201Cresidential projects creating fewer than 10 dwelling units\u201D from traffic documentation. This project (13 units) exceeds that \u2014 a traffic-impact letter is required at minimum under \u00A79.1(A)(2); a full study is the standard example for projects over 50 units or affecting a signalized intersection (\u00A79.1(A)(3))."),
      bullet("NH DOT\u2019s own traffic documentation guidance separately treats 0\u201310 units as the minimal tier for residential projects \u2014 13 units clears this external benchmark too."),
      bullet("The applicant's own memo (case file p. 11, criterion 1) offers only that the neighborhood \u201Ccomprises of a mix of various uses\u201D and the project is a \u201Creasonable transition\u201D \u2014 an assertion, not a study. No trip generation, sight distance, or vehicle count data is offered."),

      H1(2, "SPIRIT OF THE ORDINANCE IS OBSERVED \u2014 RSA 674:33, I(a)(2)(B)"),
      H2("The legal standard"),
      PRuns([
        reg("Uses the same \u201Cunduly, and in a marked degree\u201D test as public interest \u2014 the NH Supreme Court has held the two requirements are \u201Ccoextensive and related.\u201D "),
        cite("Chester Rod & Gun Club"), reg(", 152 N.H. at 580; "),
        cite("Malachy Glen Assocs. v. Town of Chichester"), reg(", 155 N.H. 102, 105\u2013106 (2007)."),
      ]),
      H2("The facts \u2014 six variances now sought (confirmed with Planning & Community Development)"),
      PRuns([
        reg("The original denial letter and August 3, 2026 hearing notice cited "),
        bold("nine"), reg(" ordinance sections. Following a subsequent plan revision, Planning & Community Development has confirmed directly that three \u2014 dumpster location, parking-drive landscaping, and fence height \u2014 have been resolved and are "),
        bold("not"), reg(" being pursued at this hearing. The six remaining:"),
      ]),
      numbered("\u00A74.3-A.1.C \u2014 Multifamily Dwellings (the use itself; zoning review lists this as \u201CNot Permitted Per\u201D this section)"),
      numbered("\u00A78.1.2 \u2014 Planned Development Lot Area (78,000 SF required; 49,484 SF actual \u2014 a 37% shortfall)"),
      numbered("\u00A75.3.1.E \u2014 Townhouse Building Type, Districts Permitted (zoning review: \u201CN/C \u2014 Townhouse Not Allowed\u201D)"),
      numbered("\u00A75.3.1.E.5.B \u2014 Maximum Height in Stories (2.5 allowed; 3 proposed)"),
      numbered("\u00A75.3.1.E.5.C \u2014 Maximum Height in Feet (35 ft allowed; 38 ft proposed)"),
      numbered("\u00A78.7.2.F.2 \u2014 Parking Location for Planned Developments (8-unit building\u2019s parking sits within 20 ft of the building)"),
      new Paragraph({ text: "", spacing: { after: 60 } }),
      bullet("Items 1 and 3 make this a use variance, not merely a dimensional one \u2014 a request to override what the R-1B district is designed to be, stacked with four further dimensional variances."),
      bullet("R-1B is defined on the zoning review sheet as \u201CResidential One-Family \u2014 High Density.\u201D The applicant's memo (p. 11, criterion 2) argues the district's \u201Cspirit\u201D is to \u201Cprovide higher density residential neighborhoods\u201D \u2014 but the district's own name specifies one-family housing at higher density, not multifamily buildings."),

      H1(3, "SUBSTANTIAL JUSTICE IS DONE \u2014 RSA 674:33, I(a)(2)(C)"),
      H2("The legal standard"),
      PRuns([
        reg("\u201CPerhaps the only guiding rule on this factor is that any loss to the individual that is not outweighed by a gain to the general public is an injustice.\u201D "),
        cite("Malachy Glen Assocs. v. Town of Chichester"), reg(", 155 N.H. 102, 109 (2007). The Board also looks at whether the proposal is consistent with the area\u2019s present use. Id."),
      ]),
      H2("The facts"),
      bullet("The applicant's memo (p. 11, criterion 3) bases \u201Csubstantial justice\u201D explicitly on the applicant's own economic benefit: \u201CThe benefits to the applicant in constructing residential which is far more conducive to the property provides substantial justice.\u201D Private profit is not a valid basis for this finding (see Criterion 5)."),
      bullet("There is no real \u201Closs\u201D to weigh in the first place \u2014 the applicant's own plans (see Criterion 5) show a fully conforming, profitable 5-lot alternative already exists."),

      H1(4, "VALUES OF SURROUNDING PROPERTIES NOT DIMINISHED \u2014 RSA 674:33, I(a)(2)(D)"),
      H2("The legal standard"),
      PRuns([
        reg("The applicant bears the burden of showing the variance will not diminish surrounding property values; unsupported assertions are insufficient. See generally "),
        cite("Governor\u2019s Island Club v. Town of Gilford"), reg(", 124 N.H. 126, 130 (1983)."),
      ]),
      H2("The facts"),
      bullet("The applicant's memo (p. 12, criterion 4) states only that there is \u201Cample buffering\u201D and the project \u201Cwould not negatively affect surrounding properties.\u201D No appraisal, market study, or real estate data appears anywhere in the application."),
      bullet("Every abutting lot is currently single-family; a 3-story, 13-unit complex is a direct change to the immediate streetscape's character that the applicant's memo doesn't quantify."),
      bullet("Optional, lower-certainty point: the Court has referenced but never formally adopted a \u201Ccumulative effect\u201D concept for weighing multiple nearby developments together \u2014 Bacon v. Town of Enfield (2004). Given the existing 96-unit complex across the street, this could support an argument about concentrated density at one intersection, though it carries less settled legal weight."),

      H1(5, "UNNECESSARY HARDSHIP \u2014 RSA 674:33, I(a)(2)(E), defined at I(b)(1)\u2013(3)"),
      H2("The legal standard"),
      PRuns([
        reg("Requires EITHER (A)(i) \u201Cno fair and substantial relationship exists between the general public purposes of the ordinance provision and the specific application of that provision to the property,\u201D AND (ii) \u201Cthe proposed use is a reasonable one\u201D \u2014 RSA 674:33, I(b)(1); OR (B) if (A) isn\u2019t established, the property \u201Ccannot be reasonably used in strict conformance with the ordinance, and a variance is therefore necessary to enable a reasonable use of it\u201D \u2014 RSA 674:33, I(b)(2). Applies identically to use and dimensional variances \u2014 I(b)(3). This unified test originates in "),
        cite("Simplex Technologies, Inc. v. Town of Newington"), reg(", 145 N.H. 727 (2001), later codified by the legislature in 2010."),
      ]),
      PRuns([
        bold("Financial or economic hardship is not, by itself, sufficient to establish unnecessary hardship. "),
        cite("Olszak v. Town of New Hampton"), reg(", 139 N.H. 723, 726 (1995); "),
        cite("Governor\u2019s Island Club v. Town of Gilford"), reg(", 124 N.H. 126, 130 (1983). Nor do personal circumstances of the landowner establish hardship \u2014 "),
        cite("Ryan v. City of Manchester"), reg(", 123 N.H. 170, 174 (1983) (landowner\u2019s own health problems did not justify a home-business variance)."),
      ]),
      H2("The facts \u2014 the applicant's own By-Right Subdivision Plan (case file p. 15, prepared by The Dubay Group, dated May 21, 2026)"),

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

      bullet("The applicant's own memo (p. 11, criterion 3) states outright: \u201CThe property can support five (5) single family home lots meeting the underlying zoning.\u201D A direct admission that a fully conforming, reasonable use exists without any variance."),
      bullet("Their stated reasons for preferring the townhouse version are convenience, not hardship: four of five lots would need separate curb cuts on Calef Road; the site would need grading \u201Cbuilt\u201D into the slope for the single-family option; and, again, \u201Cthe benefits to the applicant.\u201D"),
      bullet("Neither branch of the statutory test is satisfied: (A)(i) fails because the lot-area and density limits bear an obvious relationship to their purpose here (controlling density and traffic on a residential corner); (B) fails because the property plainly can be reasonably used in strict conformance \u2014 the applicant's own engineer drew the plan proving it."),

      H1("A", "APPENDIX \u2014 QUICK CASE LAW INDEX"),
      bullet("RSA 674:33, I(a)(2)(A)\u2013(E) \u2014 the five statutory criteria"),
      bullet("RSA 674:33, I(b)(1)\u2013(3) \u2014 definition of unnecessary hardship"),
      bullet("Simplex Technologies, Inc. v. Town of Newington, 145 N.H. 727 (2001) \u2014 unified hardship standard, later codified"),
      bullet("Olszak v. Town of New Hampton, 139 N.H. 723, 726 (1995) \u2014 financial hardship insufficient alone"),
      bullet("Governor\u2019s Island Club v. Town of Gilford, 124 N.H. 126, 130 (1983) \u2014 same principle, earlier case"),
      bullet("Ryan v. City of Manchester, 123 N.H. 170, 174 (1983) \u2014 personal circumstances \u2260 hardship"),
      bullet("Chester Rod & Gun Club v. Town of Chester, 152 N.H. 577, 581 (2005) \u2014 \u201Cunduly, in a marked degree\u201D test"),
      bullet("Harborside Assocs. v. Parade Residence Hotel, 162 N.H. 508, 514 (2011) \u2014 applies test under current statute"),
      bullet("Malachy Glen Assocs. v. Town of Chichester, 155 N.H. 102 (2007) \u2014 public interest/spirit test; substantial justice test"),
      bullet("Boccia v. City of Portsmouth, 151 N.H. 85 (2004) \u2014 recognized the use/area variance distinction, since unified by RSA 674:33, I(b)(3)"),
      bullet("Bacon v. Town of Enfield (2004) \u2014 \u201Ccumulative effect,\u201D referenced but not formally adopted by the NH Supreme Court"),

      H1("B", "APPENDIX \u2014 MANCHESTER ORDINANCE & REGULATION CITATIONS"),
      bullet("Zoning Ordinance \u00A74.3-A.1.C, \u00A75.3.1.E, \u00A75.3.1.E.5.B/C, \u00A78.1.2, \u00A78.7.2.F.2 \u2014 the six sections currently sought at the September 10, 2026 hearing. (The original denial letter and August hearing notice cited three additional sections \u2014 \u00A75.6.5.D, \u00A78.1.4, \u00A78.2.4-A \u2014 resolved by a subsequent plan revision and confirmed by Planning & Community Development as no longer pursued.)"),
      bullet("Subdivision & Site Plan Review Regs \u00A74.3(A) \u2014 complete-application requirement; written waiver required to omit any checklist item"),
      bullet("\u00A78.4(B) \u2014 Storm Drainage (site plan track, not \u00A76.4 which governs subdivisions)"),
      bullet("\u00A79.1(A)(1)\u2013(3) \u2014 Traffic Impact Studies, tiered by project size"),
      bullet("\u00A79.2 \u2014 Soil Studies"),

      H1("C", "APPENDIX \u2014 PROCEDURAL GAPS: MISSING FROM THE APPLICATION"),
      bullet("Traffic-impact letter or study (\u00A79.1)"),
      bullet("Drainage plan demonstrating stormwater compliance (\u00A78.4)"),
      bullet("Utilities Plan for sewer & water impact (required site plan checklist item)"),
      bullet("Soil Study (\u00A79.2)"),
      bullet("Market/appraisal analysis addressing surrounding property values"),
      bullet("NH Natural Heritage Bureau DataCheck \u2014 not required by ordinance, but a free, fast way to screen for state-listed species; the parcel is recorded as wooded"),

      H1("D", "APPENDIX \u2014 QUICK CONTACTS"),
      bullet("Manchester Planning & Community Development: pcd@manchesternh.gov"),
      bullet("Ward 9 Alderman Jim Burkush \u2014 (603) 714-0283, jburkush@manchesternh.gov"),
      bullet("Alderman At-Large June Trisciani \u2014 (603) 502-7800, jtrisciani@manchesternh.gov"),
      bullet("Alderman At-Large Dan O\u2019Neil \u2014 (603) 668-9814, doneil@manchesternh.gov"),
      bullet("Neighborhood contacts: Nick Levasseur (603) 361-3828 | Jen Allard (603) 661-2555"),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Field_Reference.docx', buf));
