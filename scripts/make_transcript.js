// Builds a transcript document from a JSON file of {sections:[{title, start, end, lines:[{t, text}]}]}
const { Document, Packer, Paragraph, TextRun, AlignmentType, ShadingType } = require('docx');
const fs = require('fs');
const src = process.argv[2] || '../documents/transcript_source.json';
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
const FS = 19;
const kids = [];
kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [ new TextRun({ text: "TRANSCRIPT — MANCHESTER ZONING BOARD OF ADJUSTMENT", bold: true, size: 26, color: "8B0000" }) ] }));
kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [ new TextRun({ text: "Public Hearing of September 10, 2026 — Cases ZBA2026-055 (218 South Lincoln Street) and ZBA2026-063 (26 Titus Avenue)", bold: true, size: 19 }) ] }));
kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [ new TextRun({ text: data.note, italics: true, size: 15, color: "555555" }) ] }));
for (const sec of data.sections) {
  kids.push(new Paragraph({ spacing: { before: 200, after: 80 }, shading: { type: ShadingType.CLEAR, fill: "8B0000" }, children: [ new TextRun({ text: "  " + sec.title + "   (" + sec.start + " – " + sec.end + ")", bold: true, size: 21, color: "FFFFFF" }) ] }));
  for (const ln of sec.lines) {
    kids.push(new Paragraph({ spacing: { after: 40, line: 250 }, indent: { left: 1300, hanging: 1300 }, children: [
      new TextRun({ text: ln.t + "  ", size: 16, color: "666666" }),
      new TextRun({ text: ln.text, size: FS }),
    ] }));
  }
}
const doc = new Document({ sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 700, bottom: 700, left: 900, right: 900 } } }, children: kids }] });
Packer.toBuffer(doc).then(buf => fs.writeFileSync('../documents/Titus_Ave_Hearing_Transcript.docx', buf));
