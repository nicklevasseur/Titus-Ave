const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
        AlignmentType, BorderStyle, ShadingType, LevelFormat, convertInchesToTwip } = require('docx');

const FS = 17; // 8.5pt body
const H = (text) => new Paragraph({
  spacing: { before: 110, after: 50 },
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  children: [ new TextRun({ text: "  " + text, bold: true, size: 19, color: "FFFFFF" }) ]
});
const P = (runs) => new Paragraph({ spacing: { after: 50, line: 250 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const B = (runs) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 30, line: 245 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const r = (text) => new TextRun({ text, size: FS });
const b = (text) => new TextRun({ text, bold: true, size: FS });
const i = (text) => new TextRun({ text, italics: true, size: FS });

const cell = (children, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 0, bottom: 0, left: 0, right: 160 },
  borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE}, left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} },
  children
});
const W = 5300;

const doc = new Document({
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.18), hanging: convertInchesToTwip(0.13) } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 420, bottom: 420, left: 680, right: 680 } } },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 10 },
        children: [ new TextRun({ text: "EXECUTIVE SUMMARY — 26 TITUS AVENUE", bold: true, size: 28, color: "8B0000" }) ] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 10 },
        children: [ new TextRun({ text: "Variance Application ZBA2026-063  •  Manchester Zoning Board of Adjustment  •  Hearing Thursday, September 10, 2026, 6:00 PM, City Hall, 3rd Floor", bold: true, size: 17 }) ] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 90 },
        children: [ new TextRun({ text: "Prepared by Nick Levasseur, 30 Mystic Street, Ward 9  •  September 9, 2026", italics: true, size: 15, color: "555555" }) ] }),

      P([ b("Bottom line. "), r("A Hudson developer wants to build 13 three-story townhouses on a single-family lot at the corner of Calef Road and Titus Avenue. The use is not permitted in the district, the lot is 63% of the required size, and the developer's own engineer has drawn a fully conforming five-house plan for the same land. State law lets the Board grant a variance only if the applicant proves all five statutory tests; this application fails at least three. We support more housing in Manchester. The City rewrote its zoning ordinance this year to get it built and, in doing so, kept this corner single-family. The Board should hold the applicant to that decision and deny.") ]),

      new Table({
        width: { size: 10880, type: WidthType.DXA }, columnWidths: [W, W],
        borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE}, left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE}, insideHorizontal: {style: BorderStyle.NONE}, insideVertical: {style: BorderStyle.NONE} },
        rows: [ new TableRow({ children: [
          cell([
            H("THE PROPOSAL"),
            B([ b("Applicant: "), r("T&L 2018, LLC, 156 Lowell Road, Hudson, NH. Engineer: The Dubay Group, Londonderry.") ]),
            B([ b("Site: "), r("Map 554, Lot 17C. 60,406 SF gross, 49,484 SF buildable. Zoned R-1B, Residential One-Family (High Density). Bought from the City's Parks & Recreation Department on July 17, 2024 for $150,000 as vacant residential land.") ]),
            B([ b("Project: "), r("Two townhouse buildings, 8 units and 5 units, 13 two-bedroom units total, 3 stories and 38 ft tall, 20 surface spaces plus 5 garages.") ]),
            B([ b("Relief sought (6 sections): "), r("multifamily use (§4.3-A.1.C); townhouse building type (§5.3.1.E); lot area, 78,000 SF required vs. 49,484 (§8.1.2); height in stories, 2.5 allowed vs. 3 (§5.3.1.E.5.B); height in feet, 35 vs. 38 (§5.3.1.E.5.C); parking location (§8.7.2.F.2). Three items originally cited (dumpster, drive landscaping, fence height) were resolved by an Aug. 31 plan revision.") ]),

            H("TIMELINE"),
            B([ b("Dec. 16, 2025: "), r("Aldermen adopt the new Land Use Code, 11–2–1, after a process begun in 2021. It takes effect March 1, 2026 and keeps this parcel in R-1B.") ]),
            B([ b("May 20–21, 2026: "), r("Applicant's memo, variance form, site plan, and by-right five-lot plan prepared.") ]),
            B([ b("June 22 / June 25: "), r("Application filed; City zoning review finds the use and building type not permitted.") ]),
            B([ b("Aug. 3: "), r("Building permit denied; case referred to the ZBA. Aug. 13 hearing postponed.") ]),
            B([ b("Sept. 10, 6:00 PM: "), r("Public hearing. Written comments to pcd@manchesternh.gov before then, citing ZBA2026-063.") ]),

            H("THE NEIGHBORHOOD"),
            P("North of the parcel, along its 313-ft rear line, are the single-family homes of Mystic Street. East are two single-family homes on Titus Avenue and the Mount Zion Christian School. Across Calef Road is Pine Grove Cemetery; across Titus Avenue is the 96-unit Laurel Ridge condominium. The applicant calls the project a “transition” between Laurel Ridge and the houses. The City drew the map knowing all of this and put the line at this lot."),
          ], W),
          cell([
            H("WHY IT FAILS THE FIVE-PART TEST (RSA 674:33)"),
            B([ b("Unnecessary hardship: "), r("Hardship must come from the land itself. The applicant names none. Its memo admits “the property can support five (5) single family home lots meeting the underlying zoning,” and its engineer drew that plan. The only feature cited is slope, which the five-lot plan builds on. A preference for a more profitable project is not hardship (Olszak, 139 N.H. 723).") ]),
            B([ b("Spirit of the ordinance: "), r("Two of the six variances override the district's principal use and permitted building types. The ordinance's most generous density rule supports 8 units on this land; the applicant wants 13.") ]),
            B([ b("Public interest: "), r("The City decided six months ago where townhouses belong and kept this corner single-family. A variance moves that line by private application. The file has no traffic, sight-distance, or lighting analysis; the City's review marks intersection visibility “No Information.”") ]),
            B([ b("Substantial justice: "), r("The applicant's memo argues “the benefits to the applicant.” The Board cannot weigh profit, and there is no loss to weigh when a conforming plan is already drawn.") ]),
            B([ b("Property values: "), r("The applicant's entire showing is one sentence from its engineer. No appraisal, market study, or comparable sale. The burden is the applicant's (Harrington, 152 N.H. 74).") ]),

            H("WHAT WE ARE NOT ARGUING"),
            P("Parking count (the plan meets the ordinance minimum twice over), Planning Board site-plan checklist items, or setback effects on individual abutters. Those points were dropped after review because the record contradicts them or the Planning Board, not the ZBA, decides them."),

            H("MATERIALS READY"),
            B([ r("One-page door-to-door handout and one-page five-criteria talking points sheet.") ]),
            B([ r("Two-page spoken testimony (Nick Levasseur, co-signed by Alison Famisan-Levasseur) with the Board Memo attached.") ]),
            B([ r("Five-page Board Memo with statute, case law, and packet citations; a canvassing Field Reference; and a web page that writes a neighbor's email to the Board from their chosen criterion and address.") ]),

            H("WHAT NEIGHBORS CAN DO"),
            B("Attend September 10 and speak, even briefly, to one criterion."),
            B("Email pcd@manchesternh.gov before the hearing with name, address, and Case #ZBA2026-063."),
            B("Copy Ward 9 Alderman Jim Burkush and At-Large Aldermen June Trisciani and Dan O'Neil."),
          ], W),
        ]}) ]
      }),
      new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } }, spacing: { before: 90, after: 0 },
        children: [ new TextRun({ text: "Sources: applicant's packet as posted for Sept. 10 (denial letter, zoning review, assessment card, Dubay memo, site plan, by-right plan, elevations); Manchester Land Use Code; RSA 674:33. Contacts: Nick Levasseur (603) 361-3828, Jen Allard (603) 661-2555.", italics: true, size: 14 }) ] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Executive_Summary.docx', buf));
