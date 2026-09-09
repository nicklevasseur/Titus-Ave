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
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
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
        children: [ new TextRun({ text: "VARIANCE CRITERIA — TALKING POINTS", bold: true, size: 30, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 10 },
        children: [ new TextRun({ text: "26 Titus Avenue (at Calef Road)  •  Case #ZBA2026-063", bold: true, size: 19 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 110 },
        children: [ new TextRun({ text: "Public Hearing: Thursday, September 10, 2026 — 6:00 PM — City Hall, 3rd Floor Aldermanic Chambers", italics: true, size: 17 }) ]
      }),

      new Paragraph({
        spacing: { after: 130 },
        children: [ new TextRun({
          text: "The Zoning Board can only grant a variance if it finds ALL FIVE of the criteria below are met, and the burden of proving each one is on the applicant. If even one fails, the board cannot legally approve it. Use these points when you speak or write in — you don't need to cover all five, just the ones that matter most to you.",
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
              critBullet("The City rewrote its entire zoning ordinance this year (effective March 1, 2026) after a four-year public process, and chose to keep this corner single-family. A variance would undo that decision six months later, by private application."),
              critBullet("The developer calls the project a “transition” between the 96-unit complex and the single-family homes. The City already decided where the transition is — it's the zoning line at this parcel."),
              critBullet("No traffic, safety, or lighting analysis was submitted. The City's review flags “Visibility at Intersections” as “No Information” on a corner lot."),
            ], colW),
            colCell([
              sectionHeading(4, "VALUES OF SURROUNDING PROPERTIES NOT DIMINISHED"),
              critBullet("The burden is on the developer to show values won't drop. The application contains no appraisal, market study, or comparable sales — only a one-sentence assertion from their engineer."),
              critBullet("The homes around this parcel on Mystic Street, Titus Avenue, and Calef Road are single-family. A 3-story, 13-unit development in the middle of them changes the character of those streets, and nothing in the file measures what that does to the homes."),
              critBullet("If you own a home nearby, say so. Your view of what this does to your own property is evidence the Board can consider. The developer offered none."),
            ], colW),
          ]}),
          new TableRow({ children: [
            colCell([
              sectionHeading(2, "SPIRIT OF THE ORDINANCE IS OBSERVED"),
              critBullet("Townhouses are not a permitted building type in this district — the City's own zoning review says so directly and denied the permit on that basis."),
              critBullet("Multifamily dwellings are separately flagged as not permitted under Section 4.3-A.1.C. The new ordinance says which districts get townhouses and multifamily; this isn't one of them."),
              critBullet("The applicant needs relief from 6 separate ordinance sections at once: the underlying use, building type, lot area, height in stories, height in feet, and parking location."),
              critBullet("Even under the ordinance's most generous density rule, this lot supports 8 units. They're asking for 13."),
            ], colW),
            colCell([
              sectionHeading(5, "UNNECESSARY HARDSHIP"),
              critBullet("The applicant's own engineer drew a By-Right Subdivision Plan showing this same parcel can yield 5 conforming single-family lots with zero variances needed."),
              critBullet("A fully compliant, reasonable alternative already exists on paper — that defeats any claim of hardship."),
              critBullet("Hardship must come from the land itself, not from the neighborhood around it or the applicant's preference for a bigger project. Their memo names nothing about the land except slope, and their own 5-lot plan builds on that slope."),
              critBullet("The developer bought this lot from the City in 2024 as a single-family parcel. They knew what it was zoned."),
            ], colW),
          ]}),
          new TableRow({ children: [
            colCell([
              sectionHeading(3, "SUBSTANTIAL JUSTICE IS DONE"),
              critBullet("The applicant's memo bases “substantial justice” partly on benefit to the applicant — but the Board cannot weigh the owner's economic return when deciding a variance."),
              critBullet("There's no loss to the owner to balance: they can build five houses tomorrow without a single variance."),
              critBullet("Substantial justice cuts both ways — it isn't served by shifting the cost of a bigger project onto the surrounding neighborhood."),
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
                children: [ new TextRun({ text: "•  Speak at the hearing (in person, by agent, or by counsel) — September 10, 6:00 PM.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "•  Can't attend? Email written comments to pcd@manchesternh.gov before the hearing.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "•  Always reference Case #ZBA2026-063 and the address, 26 Titus Avenue.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "•  You can focus on just one or two criteria — one solid failure is enough to deny the variance.", size: 18 }) ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [ new TextRun({ text: "•  Being for more housing and against this variance is a consistent position. The new ordinance already says where this housing type goes.", size: 18 }) ]
              }),
            ], colW),
          ]}),
        ]
      }),

      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } },
        spacing: { before: 140, after: 20 },
        children: [ new TextRun({ text: "Full case file: manchesternh.gov → Planning and Comm Dev → Zoning Board → Project Applications", italics: true, size: 15 }) ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Criteria_Sheet.docx', buf));
