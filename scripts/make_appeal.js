const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType, LevelFormat, convertInchesToTwip } = require('docx');

const FS = 20;
const H = (text) => new Paragraph({ spacing: { before: 200, after: 70 }, shading: { type: ShadingType.CLEAR, fill: "8B0000" },
  children: [ new TextRun({ text: "  " + text, bold: true, size: 22, color: "FFFFFF" }) ] });
const P = (runs) => new Paragraph({ spacing: { after: 90, line: 290 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const B = (runs) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 280 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const r = (text) => new TextRun({ text, size: FS });
const b = (text) => new TextRun({ text, bold: true, size: FS });

const doc = new Document({
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.18) } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 620, bottom: 620, left: 900, right: 900 } } },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [ new TextRun({ text: "CHALLENGING A ZBA DECISION", bold: true, size: 30, color: "8B0000" }) ] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [ new TextRun({ text: "Rehearing and Appeal Options After the Vote on ZBA2026-063 (26 Titus Avenue)", bold: true, size: 20 }) ] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 },
        children: [ new TextRun({ text: "Prepared September 11, 2026 for neighbors of 26 Titus Avenue. General information, not legal advice; talk to a New Hampshire land-use attorney before filing in court or with the Housing Appeals Board.", italics: true, size: 16, color: "555555" }) ] }),

      P([ b("Short answer. "), r("Yes. New Hampshire law provides a fixed two-step path to challenge a Zoning Board of Adjustment decision. The first step is a motion for rehearing filed with the Board itself, and it has a 30-day deadline that starts the day after the vote. That step is mandatory; no court or state board will hear an appeal unless a rehearing was requested first.") ]),

      H("STEP 1 — MOTION FOR REHEARING TO THE ZBA (RSA 677:2 and 677:3)"),
      B([ b("Deadline: "), r("30 calendar days, counted from the day after the Board voted. For a vote on September 10, 2026, the motion is due by October 10, 2026. If the City does not file the minutes and written decision within five business days of the vote, the moving party gains a right to amend the motion within 30 days of the date the written decision is actually filed. Do not rely on that extension.") ]),
      B([ b("Who may file: "), r("any party to the proceeding, or an abutter as defined in RSA 672:3. Anyone who spoke at the hearing or submitted a letter that was entered into the record is a party. Abutters are owners whose land touches the parcel, which includes the Mystic Street lots along the parcel's north line and the homes at 34 and 52 Titus Avenue.") ]),
      B([ b("What it must contain: "), r("every ground on which the decision is claimed to be unlawful or unreasonable. Grounds left out of the motion generally cannot be raised later on appeal. The Board Memorandum already states the grounds in usable form: no special condition of the land under RSA 674:33, I(b); the applicant's own admission that five conforming lots are available; the Land Use Code adopted March 1, 2026 and the spirit-of-the-ordinance criterion; and the absence of any evidence on surrounding property values.") ]),
      B([ b("What happens next: "), r("the Board may grant the rehearing if it finds good reason stated in the motion, in which case the application is heard again with notice to the parties. If the Board denies the motion, or does not act, the denial opens Step 2.") ]),

      H("STEP 2 — APPEAL WITHIN 30 DAYS OF THE REHEARING DENIAL"),
      P("The appeal must be filed within 30 days after the date the Board voted to deny the rehearing. There are two forums, and the appellant chooses one."),
      B([ b("Superior Court (RSA 677:4 through 677:15). "), r("The Board's decision is presumed lawful and reasonable. The appellant must show, by the balance of probabilities, that the decision was unlawful or unreasonable. The court reviews the record that was before the Board, which is why written material submitted before the vote matters. Filing requires a petition and a filing fee, and in practice a lawyer.") ]),
      B([ b("Housing Appeals Board (RSA 679). "), r("An independent state board created in 2020 to hear appeals from local land-use decisions involving housing, as an alternative to Superior Court. Same 30-day window, same legal standard, generally faster and less expensive. Its decisions can be appealed to the New Hampshire Supreme Court. Because this application is a housing project, a developer who loses at the ZBA is likely to prefer this forum, and it is equally available to neighbors if the Board approves.") ]),

      H("PRACTICAL NOTES"),
      B("A motion for rehearing can be prepared and filed by neighbors without a lawyer. A court or Housing Appeals Board appeal is litigation and should not be filed without one."),
      B("If the Board continued the matter, tabled it, or approved with conditions to be finalized later, the clock may not have started. Obtain the written decision from Planning and Community Development (pcd@manchesternh.gov) and read exactly what was voted before counting days."),
      B("The 30-day periods are strict. Courts have dismissed appeals filed one day late. File early, and keep proof of the filing date."),
      B("Every person who wants standing to appeal should be named in the rehearing motion. Adding people later is difficult."),

      new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } }, spacing: { before: 160, after: 0 },
        children: [ new TextRun({ text: "Sources: RSA 677:2 (motion for rehearing); RSA 677:3 (rehearing by the board); RSA 677:4 (appeal to superior court); RSA 677:6 (burden of proof); RSA 679 (Housing Appeals Board); NH Office of Planning and Development, The Board of Adjustment in New Hampshire, Chapter IV (2024). Contacts: Nick Levasseur (603) 361-3828, Jen Allard (603) 661-2555.", italics: true, size: 15 }) ] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Appeal_Options.docx', buf));
