const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
        AlignmentType, BorderStyle, ShadingType, LevelFormat, VerticalAlign, convertInchesToTwip } = require('docx');

const H1 = (text) => new Paragraph({
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  spacing: { before: 260, after: 100 },
  children: [ new TextRun({ text: `  ${text}`, bold: true, size: 25, color: "FFFFFF" }) ]
});

const H1urgent = (text) => new Paragraph({
  shading: { type: ShadingType.CLEAR, fill: "CC0000" },
  spacing: { before: 100, after: 100 },
  children: [ new TextRun({ text: `  \u26A0  ${text}`, bold: true, size: 26, color: "FFFFFF" }) ]
});

const P = (text, opts={}) => new Paragraph({
  spacing: { after: 100, line: 300 },
  children: [ new TextRun({ text, size: 21, ...opts }) ]
});

const PRuns = (runs) => new Paragraph({ spacing: { after: 100, line: 300 }, children: runs });

const bullet = (text, opts={}) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 80, line: 290 },
  children: [ new TextRun({ text, size: 20, ...opts }) ]
});

const bold = (text) => new TextRun({ text, bold: true, size: 21 });
const reg = (text) => new TextRun({ text, size: 21 });

const tableHeaderCell = (text, width) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  margins: { top: 70, bottom: 70, left: 100, right: 100 },
  children: [ new Paragraph({ children: [ new TextRun({ text, bold: true, size: 18, color: "FFFFFF" }) ] }) ]
});
const tableCell = (text, width, opts={}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [ new Paragraph({ children: [ new TextRun({ text, size: 18, ...opts }) ] }) ]
});

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.18) } } } }]
    }]
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 620, bottom: 620, left: 800, right: 800 } } },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [ new TextRun({ text: "ZBA2026-063 — VERSION COMPARISON & IMPACT SUMMARY", bold: true, size: 28, color: "8B0000" }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [ new TextRun({ text: "Original Submission (June 22, 2026) vs. Current Record (Sept. 10, 2026 Agenda)", italics: true, size: 18, color: "555555" }) ]
      }),

      new Paragraph({ text: "", spacing: { after: 40 } }),

      H1urgent("1. THE AGENDA'S VARIANCE LIST DISCREPANCY \u2014 RESOLVED"),
      PRuns([
        bold("Confirmed directly with Planning & Community Development. "),
        reg("The head of planning confirmed by phone that the file now posted on the City's website is the current, controlling version, that it does address the changes behind the reduced variance count, and that the three dropped sections \u2014 dumpster location, parking-drive landscaping, and fence height \u2014 are resolved and will "),
        bold("not"), reg(" be addressed at the September 10 hearing. He described the changes as \u201Csubtle,\u201D which is consistent with why the packet's own zoning review pages (unchanged since the original submission) still show those three items as non-compliant \u2014 that page was never reissued after the revision."),
      ]),
      P("The original packet (and the Aug. 13 hearing notice) cited nine ordinance sections. The six now confirmed as live for the September 10 hearing:"),

      new Table({
        width: { size: 9600, type: WidthType.DXA },
        columnWidths: [4800, 4800],
        rows: [
          new TableRow({ children: [ tableHeaderCell("Confirmed live (6)", 4800), tableHeaderCell("Resolved, not pursued (3)", 4800) ]}),
          new TableRow({ children: [
            tableCell("4.3-A.1.C \u2014 Multifamily Dwellings (use)", 4800),
            tableCell("5.6.5.D \u2014 Dumpster Location", 4800, { color: "888888" }),
          ]}),
          new TableRow({ children: [
            tableCell("8.1.2 \u2014 Planned Development Lot Area", 4800),
            tableCell("8.1.4 \u2014 Townhouse Parking Drive Landscaping", 4800, { color: "888888" }),
          ]}),
          new TableRow({ children: [
            tableCell("5.3.1.E \u2014 Townhouse Building Type", 4800),
            tableCell("8.2.4-A \u2014 Fence Height", 4800, { color: "888888" }),
          ]}),
          new TableRow({ children: [ tableCell("5.3.1.E.5.B \u2014 Max. Height in Stories", 4800), tableCell("", 4800) ]}),
          new TableRow({ children: [ tableCell("5.3.1.E.5.C \u2014 Max. Height in Feet", 4800), tableCell("", 4800) ]}),
          new TableRow({ children: [ tableCell("8.7.2.F.2 \u2014 Parking Location", 4800), tableCell("", 4800) ]}),
        ]
      }),
      new Paragraph({ text: "", spacing: { after: 140 } }),

      P("All five documents (handout, criteria sheet, testimony, board memo, field reference) have been updated to reflect six variances and the September 10 hearing date.", { bold: true }),

      H1("2. WHAT ACTUALLY CHANGED IN THE PACKET ITSELF (VERIFIED BY CHECKSUM)"),
      P("Every one of the 17 pages in both packets was compared byte-for-byte. Only 2 pages differ:"),
      bullet("Page 13 (Conceptual Site Plan) and Page 14 (Zoning Exhibit) \u2014 both carry a new revision block: \u201CREV 1, 8/31/26, REV PER STAFF COMMENT, by REK.\u201D"),
      bullet("The only visible change: the surface parking layout shifted by one stall. The 5-unit building's lot went from 5 spaces to 4; the 8-unit building's lot went from 15 to 16. Total surface count is unchanged at 20."),
      bullet("All 15 other pages \u2014 denial letter, all 5 zoning review pages, the assessment card, the GIS map, the Variance Criteria form, both pages of the Dubay Group memo, the By-Right Subdivision Plan, and both elevation sheets \u2014 are byte-for-byte identical to the original."),
      PRuns([
        bold("Impact: "), reg("minor, on its own. This revision does not change unit count, building height, lot area, or (per the packet itself) any of the nine originally-cited variance sections. It's a technical correction, not a substantive redesign \u2014 the open question in Section 2 above is a separate, agenda-level issue, not something caused by this packet revision."),
      ]),

      H1("3. FIXES APPLIED ACROSS ALL FIVE DOCUMENTS"),
      new Table({
        width: { size: 9600, type: WidthType.DXA },
        columnWidths: [3400, 6200],
        rows: [
          new TableRow({ children: [ tableHeaderCell("Item", 3400), tableHeaderCell("Status", 6200) ]}),
          new TableRow({ children: [
            tableCell("Hearing date", 3400, { bold: true }),
            tableCell("Updated from August 13 to September 10, 2026 in all five documents.", 6200),
          ]}),
          new TableRow({ children: [
            tableCell("Six variances", 3400, { bold: true }),
            tableCell("Confirmed with PCD and applied \u2014 the handout's stat box, the criteria sheet, the testimony's \u201CSecond\u201D point, and the board memo's Criterion 2 section all now read six, with the nine-to-six history noted where relevant.", 6200),
          ]}),
          new TableRow({ children: [
            tableCell("Dumpster / fence / landscaping bullets", 3400, { bold: true }),
            tableCell("Removed from the handout, criteria sheet, testimony, and board memo \u2014 confirmed resolved and not being pursued.", 6200),
          ]}),
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Version_Comparison.docx', buf));
