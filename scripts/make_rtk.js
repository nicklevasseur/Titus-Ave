const { Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, convertInchesToTwip } = require('docx');
const FS = 22;
const P = (runs) => new Paragraph({ spacing: { after: 130, line: 300 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const N = (runs) => new Paragraph({ numbering: { reference: "nums", level: 0 }, spacing: { after: 100, line: 300 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const r = (t) => new TextRun({ text: t, size: FS });
const b = (t) => new TextRun({ text: t, bold: true, size: FS });
const blank = (t) => new TextRun({ text: "[" + t + "]", bold: true, size: FS, highlight: "yellow" });

const doc = new Document({
  numbering: { config: [{ reference: "nums", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.4), hanging: convertInchesToTwip(0.4) } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, bottom: 1100, left: 1300, right: 1300 } } },
    children: [
      P("Nickolas J. Levasseur\n30 Mystic Street\nManchester, NH 03103\n(603) 361-3828"),
      P([ r("Date: "), blank("date") ]),
      P("City Clerk, City of Manchester\nOne City Hall Plaza\nManchester, NH 03101"),
      P("Planning and Community Development Department\nOne City Hall Plaza, West Wing\nManchester, NH 03101\npcd@manchesternh.gov"),
      P([ b("Re: Request for Governmental Records under RSA 91-A — Zoning Board of Adjustment Case No. ZBA2026-063, 26 Titus Avenue (Map 554, Lot 17C)") ]),
      P("Dear City Clerk and Director Belanger:"),
      P("Under RSA 91-A:4, I request to inspect and obtain copies of the following governmental records. Electronic copies by email are preferred where the records exist in electronic form."),
      N("The audio and video recording of the Zoning Board of Adjustment meeting of September 10, 2026, in its entirety, or the portion concerning Case No. ZBA2026-063 if the recording is segmented."),
      N("The minutes of that meeting, in draft or final form, and the written notice of decision in Case No. ZBA2026-063, with the date each was filed or made available."),
      N("The complete file for Case No. ZBA2026-063, including the application, all plans and exhibits, staff reports and memoranda, the Planned Development Standards Review Sheet referenced in the Zoning Review dated June 25, 2026, any slope, grade, or topographic analysis of the parcel, all written public comment received, and any correspondence in the file."),
      N("All communications, including email and text messages on any account or device used for City business, between any member of the Zoning Board of Adjustment and T&L 2018, LLC, its principals, The Dubay Group, Inc., or Doug MacGuire, concerning 26 Titus Avenue or Case No. ZBA2026-063, from January 1, 2024 to the present."),
      N("All communications between Planning and Community Development staff and any member of the Zoning Board of Adjustment concerning Case No. ZBA2026-063, from June 22, 2026 to the present."),
      N("The records of the City's 2024 conveyance of Map 554, Lot 17C to T&L 2018, LLC, including the Board of Mayor and Aldermen resolution or vote authorizing the sale, committee reports, any appraisal or valuation, the auction notice, terms and conditions of sale, bid results, the purchase and sale agreement, and the recorded deed (Hillsborough County Registry Book 9788, Page 1181). At the September 10 hearing the owner stated that he purchased the parcel at a City auction and that the Mayor was “on record” regarding the intended use of surplus City property; please include any statement, press release, or minutes reflecting that."),
      N("The complete file for Case No. ZBA2026-055, 218 South Lincoln Street, heard immediately before Case No. ZBA2026-063 on September 10, 2026, including the written notice of decision, so that the two decisions may be compared."),
      N("Any disclosure of interest, recusal statement, or statement of professional affiliation filed by any member of the Zoning Board of Adjustment in connection with Case No. ZBA2026-063."),
      P("If any portion of a record is withheld, please identify the record and the specific exemption relied on, as RSA 91-A:4, IV requires. If the request cannot be fulfilled within five business days, please provide the written statement of the time reasonably necessary that the statute contemplates. Please contact me before incurring copying costs above $25."),
      P("A motion for rehearing in this matter is due within 30 days of the Board's September 10 vote. I would be grateful for the recording and the written decision as early as possible for that reason."),
      P("Thank you for your assistance."),
      P("Sincerely,"),
      new Paragraph({ text: "", spacing: { after: 300 } }),
      P("______________________________\nNickolas J. Levasseur"),
    ]
  }]
});
Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Records_Request.docx', buf));
