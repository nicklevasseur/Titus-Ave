const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
        AlignmentType, BorderStyle, ShadingType, LevelFormat, VerticalAlign, HeightRule,
        ImageRun, convertInchesToTwip } = require('docx');
const fs = require('fs');

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 45 },
  children: [ new TextRun({ text, size: 20 }) ]
});

const contactCell = (name, role, phone, email, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 90, bottom: 90, left: 110, right: 110 },
  borders: {
    top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
  },
  children: [
    new Paragraph({ spacing: { after: 15 }, children: [ new TextRun({ text: name, bold: true, size: 19 }) ] }),
    new Paragraph({ spacing: { after: 35 }, children: [ new TextRun({ text: role, italics: true, size: 15 }) ] }),
    new Paragraph({ spacing: { after: 8 }, children: [ new TextRun({ text: phone, size: 17 }) ] }),
    new Paragraph({ children: [ new TextRun({ text: email, size: 17 }) ] }),
  ]
});

const vStatCell = (big, small, width, isLast) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  verticalAlign: VerticalAlign.CENTER,
  shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
  margins: { top: 140, bottom: 140, left: 140, right: 140 },
  borders: isLast ? {} : { bottom: { style: BorderStyle.SINGLE, size: 4, color: "FFFFFF" } },
  children: [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
      children: [ new TextRun({ text: big, bold: true, size: 25, color: "8B0000" }) ] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [ new TextRun({ text: small, bold: true, size: 21 }) ] }),
  ]
});

const colW3 = 3480;
const leftColW = 5840;
const rightColW = 4600;

const elevBuf = fs.readFileSync('../assets/front_elevation.jpg');
const elevWidth = 600;
const elevHeight = Math.round(elevWidth / (1135/290));

const siteBuf = fs.readFileSync('../assets/site_context.jpg');
const siteWidth = 255;
const siteHeight = Math.round(siteWidth / (1047/1359));

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.18) } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 300, bottom: 300, left: 860, right: 860 }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [ new TextRun({ text: "STOP THE 13-UNIT TOWNHOUSE DEVELOPMENT", bold: true, size: 32, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 110 },
        children: [ new TextRun({ text: "26 Titus Avenue (at Calef Road)  \u2022  Case #ZBA2026-063", bold: true, size: 20 }) ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { type: ShadingType.CLEAR, fill: "8B0000" },
        spacing: { before: 40, after: 40 },
        children: [ new TextRun({
          text: "PUBLIC HEARING \u2014 THURSDAY, SEPTEMBER 10, 2026 \u2014 6:00 PM \u2014 CITY HALL, 3RD FLOOR",
          bold: true, size: 20, color: "FFFFFF"
        }) ]
      }),

      new Paragraph({ text: "", spacing: { after: 100 } }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new ImageRun({ data: elevBuf, transformation: { width: elevWidth, height: elevHeight }, type: "jpg" })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 130 },
        children: [ new TextRun({ text: "The developer's own rendering: the 8-unit building, as proposed", italics: true, size: 15 }) ]
      }),

      new Table({
        width: { size: 10440, type: WidthType.DXA },
        columnWidths: [leftColW, rightColW],
        rows: [
          new TableRow({ height: { value: 1240, rule: HeightRule.ATLEAST }, children: [
            vStatCell("CONTRARY TO THE PUBLIC INTEREST", "The City just rezoned this corner single-family", leftColW, false),
            new TableCell({
              width: { size: rightColW, type: WidthType.DXA },
              verticalMerge: "restart",
              verticalAlign: VerticalAlign.CENTER,
              margins: { top: 0, bottom: 0, left: 100, right: 0 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 20 },
                  children: [ new ImageRun({ data: siteBuf, transformation: { width: siteWidth, height: siteHeight }, type: "jpg" }) ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [ new TextRun({ text: "The proposal, surrounded by single-family homes on Mystic St., Titus Ave. and Calef Rd.", italics: true, size: 14, bold: true, color: "8B0000" }) ]
                }),
              ]
            }),
          ]}),
          new TableRow({ height: { value: 1240, rule: HeightRule.ATLEAST }, children: [
            vStatCell("ORDINANCE NOT OBSERVED", "6 variances sought", leftColW, false),
            new TableCell({ width: { size: rightColW, type: WidthType.DXA }, verticalMerge: "continue", children: [ new Paragraph({ text: "" }) ] }),
          ]}),
          new TableRow({ height: { value: 1240, rule: HeightRule.ATLEAST }, children: [
            vStatCell("VALUES OF SURROUNDING PROPERTIES AFFECTED", "No appraisal, no market data \u2014 only the developer's say-so", leftColW, false),
            new TableCell({ width: { size: rightColW, type: WidthType.DXA }, verticalMerge: "continue", children: [ new Paragraph({ text: "" }) ] }),
          ]}),
          new TableRow({ height: { value: 1240, rule: HeightRule.ATLEAST }, children: [
            vStatCell("NO HARDSHIP TO THE OWNER", "Their own submission shows 5 buildable lots", leftColW, true),
            new TableCell({ width: { size: rightColW, type: WidthType.DXA }, verticalMerge: "continue", children: [ new Paragraph({ text: "" }) ] }),
          ]}),
        ]
      }),

      new Paragraph({ text: "", spacing: { after: 80 } }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 140 },
        children: [ new TextRun({
          text: "The lot is 49,484 sq ft \u2014 zoning requires 78,000 sq ft for this many units. Even under the ordinance's most generous density rule, this land supports 8 units. They want 13.",
          size: 19, bold: true
        }) ]
      }),

      bullet("Townhouses are not permitted in this district \u2014 the City's own zoning review says so directly, and denied the permit on that basis."),
      bullet("The City rewrote its zoning ordinance this year (effective March 1, 2026) and kept this corner single-family. The developer bought the lot from the City in 2024 knowing that."),
      bullet("No traffic or safety analysis for a corner already shared with a 96-unit complex \u2014 the City's review marks intersection visibility \u201CNo Information.\u201D"),
      bullet("Exceeds maximum height restrictions \u2014 38 feet proposed where 35 feet is the max allowed."),

      new Paragraph({ text: "", spacing: { after: 30 } }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { type: ShadingType.CLEAR, fill: "8B0000" },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } },
        spacing: { before: 15, after: 40 },
        children: [ new TextRun({ text: "GET INVOLVED NOW!", bold: true, size: 26, color: "FFFFFF" }) ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 25 },
        children: [ new TextRun({ text: "CONTACT YOUR ALDERMEN", bold: true, size: 21, color: "8B0000" }) ]
      }),

      new Table({
        width: { size: 10440, type: WidthType.DXA },
        columnWidths: [colW3, colW3, colW3],
        rows: [
          new TableRow({ children: [
            contactCell("Jim Burkush", "Ward 9 Alderman", "(603) 714-0283", "jburkush@manchesternh.gov", colW3),
            contactCell("June Trisciani", "Alderman At-Large", "(603) 502-7800", "jtrisciani@manchesternh.gov", colW3),
            contactCell("Dan O'Neil", "Alderman At-Large", "(603) 668-9814", "doneil@manchesternh.gov", colW3),
          ]}),
        ]
      }),

      new Paragraph({ text: "", spacing: { after: 30 } }),

      new Paragraph({
        spacing: { after: 8 },
        children: [ new TextRun({ text: "SHOW UP SEPTEMBER 10 \u2014 OR EMAIL pcd@manchesternh.gov CITING CASE #ZBA2026-063", bold: true, size: 20 }) ]
      }),

      new Paragraph({
        spacing: { before: 50, after: 30 },
        children: [ new TextRun({ text: "QUESTIONS? NEIGHBORHOOD CONTACTS: Nick Levasseur \u2014 (603) 361-3828  |  Jen Allard \u2014 (603) 661-2555", bold: true, size: 20 }) ]
      }),
      new Paragraph({
        children: [ new TextRun({ text: "Full file: manchesternh.gov \u2192 Planning and Comm Dev \u2192 Zoning Board \u2192 Project Applications", italics: true, size: 15 }) ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Handout.docx', buf));
