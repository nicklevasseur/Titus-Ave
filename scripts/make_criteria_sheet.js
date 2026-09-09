const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
        AlignmentType, BorderStyle, ShadingType, LevelFormat, convertInchesToTwip } = require('docx');

const sectionHeading = (num, text) => new Paragraph({
  spacing: { before: 140, after: 60 },
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  children: [ new TextRun({ text: `${num}.  ${text}`, bold: true, size: 21, color: "FFFFFF" }) ]
});

const critBullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 60 },
  children: [ new TextRun({ text, size: 18 }) ]
});

const colCell = (children, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 0, bottom: 0, left: 0, right: 160 },
  borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE}, left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE} },
  children
});

const colW = 5220;

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.22), hanging: convertInchesToTwip(0.15) } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 380, bottom: 380, left: 720, right: 720 }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 15 },
        children: [ new TextRun({ text: "VARIANCE CRITERIA \u2014 TALKING POINTS", bold: true, size: 30, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 10 },
        children: [ new TextRun({ text: "26 Titus Avenue (at Calef Road)  \u2022  Case #ZBA2026-063", bold: true, size: 19 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 110 },
        children: [ new TextRun({ text: "Public Hearing: Thursday, September 10, 2026 \u2014 6:00 PM \u2014 City Hall, 3rd Floor Aldermanic Chambers", italics: true, size: 17 }) ]
      }),

      new Paragraph({
        spacing: { after: 130 },
        children: [ new TextRun({
          text: "The Zoning Board can only grant a variance if it finds ALL FIVE of the criteria below are met. If even one fails, the board cannot legally approve it. Use these points when you speak or write in \u2014 you don't need to cover all five, just the ones that matter most to you.",
          size: 19, bold: true
        }) ]
      }),

      new Table({
        width: { size: 10440, type: WidthType.DXA },
        columnWidths: [colW, colW],
        borders: { top: {style: BorderStyle.NONE}, bottom: {style: BorderStyle.NONE}, left: {style: BorderStyle.NONE}, right: {style: BorderStyle.NONE},
                   insideHorizontal: {style: BorderStyle.NONE}, insideVertical: {style: BorderStyle.NONE} },
        rows: [
          new TableRow({ children: [
            colCell([
              sectionHeading(1, "NOT CONTRARY TO THE PUBLIC INTEREST"),
              critBullet("No traffic, parking, safety, or lighting study was submitted with this application."),
              critBullet("Only 20 parking spaces for 13 units \u2014 potentially 40+ residents. Overflow will land on Titus Ave, Calef Road, and Mystic Street."),
              critBullet("Granting this converts a residential corner into a much higher-traffic, higher-density site with no independent analysis of the impact."),
            ], colW),
            colCell([
              sectionHeading(4, "VALUES OF SURROUNDING PROPERTIES NOT DIMINISHED"),
              critBullet("The application contains no appraisal, market study, or real estate data to support this claim \u2014 only general assertions from the applicant's engineer."),
              critBullet("Every abutting lot is single-family. A 3-story, 13-unit complex changes the character of the immediate streetscape."),
            ], colW),
          ]}),
          new TableRow({ children: [
            colCell([
              sectionHeading(2, "SPIRIT OF THE ORDINANCE IS OBSERVED"),
              critBullet("Townhouses are not a permitted building type in this district \u2014 the City's own zoning review says so directly and denied the permit on that basis."),
              critBullet("Multifamily dwellings are separately flagged as not permitted under Section 4.3-A.1.C."),
              critBullet("The applicant needs relief from 6 separate ordinance sections at once: the underlying use, building type, lot area, height in stories, height in feet, and parking location."),
              critBullet("That volume of relief suggests the project doesn't fit the district \u2014 not a minor technical adjustment."),
            ], colW),
            colCell([
              sectionHeading(5, "UNNECESSARY HARDSHIP"),
              critBullet("The applicant's own engineer drew a By-Right Subdivision Plan showing this same parcel can yield 5 conforming single-family lots with zero variances needed."),
              critBullet("A fully compliant, reasonable alternative already exists on paper \u2014 that defeats any claim of hardship."),
              critBullet("Hardship must come from the property itself, not from the applicant's preference for a bigger project."),
            ], colW),
          ]}),
          new TableRow({ children: [
            colCell([
              sectionHeading(3, "SUBSTANTIAL JUSTICE IS DONE"),
              critBullet("The applicant's memo bases \u201Csubstantial justice\u201D partly on benefit to the applicant \u2014 but the Board cannot weigh the owner's economic return when deciding a variance."),
              critBullet("Justice has to be balanced against the burden on neighbors: overflow parking, added traffic, and reduced buffers are real costs the applicant's memo doesn't address."),
              critBullet("Substantial justice cuts both ways \u2014 it isn't served by shifting the cost of a bigger project onto the surrounding neighborhood."),
            ], colW),
            colCell([
              new Paragraph({ text: "", spacing: { after: 100 } }),
              new Paragraph({
                shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
                spacing: { before: 40, after: 40 },
                children: [ new TextRun({ text: "  HOW TO WEIGH IN", bold: true, size: 19, color: "8B0000" }) ]
              }),
              new Paragraph({
                spacing: { before: 60, after: 40 },
                children: [ new TextRun({ text: "\u2022  Speak at the hearing (in person, by agent, or by counsel) \u2014 September 10, 6:00 PM.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "\u2022  Can't attend? Email written comments to pcd@manchesternh.gov before the hearing.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "\u2022  Always reference Case #ZBA2026-063 and the address, 26 Titus Avenue.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "\u2022  You can focus on just one or two criteria \u2014 one solid failure is enough to deny the variance.", size: 18 }) ]
              }),
            ], colW),
          ]}),
        ]
      }),

      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } },
        spacing: { before: 140, after: 20 },
        children: [ new TextRun({ text: "Full case file: manchesternh.gov \u2192 Planning and Comm Dev \u2192 Zoning Board \u2192 Project Applications", italics: true, size: 15 }) ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Criteria_Sheet.docx', buf));
