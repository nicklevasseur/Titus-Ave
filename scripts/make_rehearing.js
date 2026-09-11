const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat, convertInchesToTwip } = require('docx');

const FS = 22;
const P = (runs, opts={}) => new Paragraph({ spacing: { after: 120, line: 300 }, ...opts, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const H = (text) => new Paragraph({ spacing: { before: 220, after: 100 }, children: [ new TextRun({ text, bold: true, size: FS }) ] });
const N = (runs) => new Paragraph({ numbering: { reference: "nums", level: 0 }, spacing: { after: 110, line: 300 }, children: typeof runs === 'string' ? [ new TextRun({ text: runs, size: FS }) ] : runs });
const r = (t) => new TextRun({ text: t, size: FS });
const b = (t) => new TextRun({ text: t, bold: true, size: FS });
const i = (t) => new TextRun({ text: t, italics: true, size: FS });
const blank = (t) => new TextRun({ text: "[" + t + "]", bold: true, size: FS, highlight: "yellow" });
const C = (text, o={}) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [ new TextRun({ text, bold: true, size: o.size || FS }) ] });

const doc = new Document({
  numbering: { config: [{ reference: "nums", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: convertInchesToTwip(0.4), hanging: convertInchesToTwip(0.4) } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1200, bottom: 1100, left: 1300, right: 1300 } } },
    children: [
      C("CITY OF MANCHESTER, NEW HAMPSHIRE"),
      C("ZONING BOARD OF ADJUSTMENT"),
      new Paragraph({ text: "", spacing: { after: 120 } }),
      C("Case No. ZBA2026-063 — 26 Titus Avenue (Map 554, Lot 17C)"),
      C("Applicant: T&L 2018, LLC"),
      new Paragraph({ text: "", spacing: { after: 160 } }),
      C("MOTION FOR REHEARING", { size: 26 }),
      C("Pursuant to RSA 677:2"),
      new Paragraph({ text: "", spacing: { after: 160 } }),

      P([ r("NOW COME Nickolas J. Levasseur and Alison Famisan-Levasseur of 30 Mystic Street, Manchester, New Hampshire 03103, "), blank("and the following abutters: names and addresses, or delete"), r(" (together, the “Movants”), and respectfully move the Zoning Board of Adjustment (the “Board”) to grant a rehearing of its decision of September 10, 2026 granting the variances requested in the above-captioned application. In support of this motion the Movants state as follows.") ]),

      H("I. Standing and Timeliness"),
      N([ r("The Movants are parties to this proceeding within the meaning of RSA 677:2. Nickolas J. Levasseur spoke in opposition at the public hearing on September 10, 2026 and, together with Alison Famisan-Levasseur, submitted written testimony and a Memorandum in Opposition that were entered into the record. "), blank("If abutters join: The abutters named above are abutters as defined in RSA 672:3 and received notice of the hearing.") ]),
      N([ r("The Board voted to grant the application on September 10, 2026. This motion is filed within 30 calendar days of that vote, as RSA 677:2 requires. The Board's written decision was filed on "), blank("date"), r(". To the extent the written decision was filed more than five business days after the vote, the Movants reserve the right to amend this motion under RSA 677:2.") ]),

      H("II. Background"),
      N("The applicant sought relief from six sections of the Manchester Land Use Code to construct two townhouse buildings containing thirteen multifamily dwelling units on a 49,484 square foot buildable lot in the R-1B (Residential One-Family, High Density) district: §4.3-A.1.C (multifamily use), §5.3.1.E (townhouse building type), §8.1.2 (planned development lot area), §5.3.1.E.5.B and §5.3.1.E.5.C (height in stories and feet), and §8.7.2.F.2 (parking location)."),
      N("The applicant's submission consisted of the City's denial letter and zoning review, an assessment card, a GIS map, a two-page memorandum from its engineer, a conceptual site plan, a zoning exhibit, a by-right subdivision plan showing five conforming single-family lots, and conceptual elevations. The submission contained no appraisal, market study, or other evidence concerning surrounding property values, and no quantified analysis of the slope of the parcel."),
      N([ r("The Board voted to approve. Member Mathew Carnevale voted against approval, stating on the record that the applicant had not demonstrated unnecessary hardship, had not addressed the effect on surrounding property values, and had not shown that the spirit of the ordinance would be observed. "), blank("Confirm spelling of the member's name against the minutes.") ]),

      H("III. Grounds for Rehearing"),
      P([ b("Ground 1. The decision rests on facts and opinion that are not in the record and that the Movants had no opportunity to address.") ]),
      N("During deliberations, after the public hearing had been closed, Vice Chair Craig St. Pierre stated that eighteen percent of the property is undevelopable because of slope, and treated that as a hardship supporting the variances. No witness testified to that proposition. The applicant's memorandum does not make it. The applicant's only reference to slope is that a single-family layout would require grading “built” into the slope."),
      N("The eighteen percent figure appears to derive from the Zoning Review in the file, which computes buildable lot area as 60,406 square feet less 10,922 square feet for slopes, or 49,484 square feet. That deduction is the ordinance's method of calculating buildable area on any parcel with steep grades. It is not a finding that the land cannot be developed. The same deduction was applied to the applicant's own By-Right Subdivision Plan, which nonetheless yields five conforming single-family lots, each with more than 6,000 square feet of buildable area. The ordinance has already accounted for the slope, and the applicant's own engineer has designed a conforming project around it. A lot-area line item cannot be a special condition of the property when the applicant's conforming plan already incorporates it."),
      N("The applicant never argued that the slope prevents a reasonable conforming use, because its own plan shows that it does not. The hardship theory on which the Board relied was supplied by a Board member during deliberation, not by the applicant, and the Movants had no opportunity to answer it."),
      N("During the same deliberations, Vice Chair St. Pierre offered his professional judgment, as a real estate agent, that the development would not affect the value of surrounding properties. The applicant's entire showing on that criterion was a single sentence in its engineer's memorandum. The Board's finding under RSA 674:33, I(a)(2)(D) therefore has no support in the record unless a Board member's own opinion, delivered after the hearing closed, is treated as the applicant's evidence."),
      N([ r("A board's decision must rest on more than the personal opinion of its members. "), i("Condos East Corp. v. Town of Conway"), r(", 132 N.H. 431 (1989). The burden of proof on each of the five criteria rests with the applicant. "), i("Harrington v. Town of Warner"), r(", 152 N.H. 74 (2005). Facts and expert opinion introduced during deliberation, when no party can question or answer them, deny the opposing parties a fair hearing. The Movants raise this issue now because it could not have been raised earlier: the information was first disclosed after the public hearing was closed.") ]),
      N("The Movants request that, on rehearing, the Board state on the record the basis for treating the slope deduction as a hardship and the basis of the opinion offered on property values, and afford the parties an opportunity to respond to both."),

      P([ b("Ground 2. The applicant did not establish unnecessary hardship under RSA 674:33, I(b).") ]),
      N([ r("Both branches of the hardship test begin with “special conditions of the property that distinguish it from other properties in the area.” Those conditions must be conditions of the land itself, not of the proposed use or the surrounding neighborhood. "), i("Bacon v. Town of Enfield"), r(", 150 N.H. 468 (2004). The applicant's memorandum identifies none. Its response to the first branch states only that the townhouses “fit well into the neighborhood,” which describes the use, not the land.") ]),
      N("The applicant's own memorandum admits that “the property can support five (5) single family home lots meeting the underlying zoning,” and its engineer drew that plan (By-Right Subdivision Plan, Sheet 3 of 3). A conforming, reasonable use of the property therefore exists without any variance. The applicant's stated reasons for preferring the townhouse project are the number of curb cuts, the cost of grading, and “the benefits to the applicant.” Those are matters of convenience and profit, which do not establish hardship. Olszak v. Town of New Hampton, 139 N.H. 723, 726 (1995); Governor's Island Club v. Town of Gilford, 124 N.H. 126, 130 (1983)."),
      N([ r("The applicant purchased the parcel from the City of Manchester on July 17, 2024 as vacant residential land in the R-1B district. While purchase with knowledge of the restriction does not bar a variance, it is a factor the Board may weigh. "), i("Hill v. Town of Chester"), r(", 146 N.H. 291 (2001).") ]),

      P([ b("Ground 3. The applicant offered no evidence that surrounding property values would not be diminished, RSA 674:33, I(a)(2)(D).") ]),
      N("The record contains no appraisal, market analysis, or comparable sales. The only statement on the subject is one sentence from the applicant's engineer. A finding on this criterion cannot rest on that sentence, and, for the reasons stated in Ground 1, cannot rest on a Board member's own opinion. The parcel is bordered within the R-1B district by single-family homes on Mystic Street, Titus Avenue, and Calef Road."),

      P([ b("Ground 4. The variances are contrary to the public interest and the spirit of the ordinance, RSA 674:33, I(a)(2)(A) and (B).") ]),
      N("The Board of Mayor and Aldermen adopted the Manchester Land Use Code on December 16, 2025, after a public process that began in 2021, and it took effect on March 1, 2026. In that code the City determined, district by district, where townhouse and multifamily building types are permitted, and it retained this parcel in the R-1B district with full knowledge of the Laurel Ridge condominiums across Titus Avenue and the Mount Zion Christian School to the east, all of which appear on the applicant's own zoning exhibit. Two of the six variances override the district's principal permitted use and its permitted building types. Granting them relocates, by private application, a line the City drew through its legislative process six months earlier. That conflicts with the ordinance's basic zoning objectives unduly and in a marked degree. Chester Rod & Gun Club v. Town of Chester, 152 N.H. 577, 581 (2005); Harborside Assocs. v. Parade Residence Hotel, 162 N.H. 508, 514 (2011)."),
      N("Under §8.1.2, at 6,000 square feet of lot area per unit, the parcel supports eight units even under the planned-development standard. The applicant sought thirteen."),

      P([ b("Ground 5. The relief granted may not be complete.") ]),
      N("The zoning review marks §8.7 Planned Developments “Not Permitted within the District.” The site plan nonetheless uses ten-foot side and rear setbacks, where the base-district standards printed on the applicant's own zoning exhibit require twenty-foot side and thirty-foot rear yards for any structure other than a one-family dwelling. If additional relief is required for the layout the Board approved, the approval rests on an incomplete application. The Movants request that the Board confirm on the record, with input from Planning and Community Development staff, whether the six sections granted constitute all relief the approved plan requires."),

      P([ b("Ground 6. Participation of the Vice Chair.") ]),
      N("RSA 673:14, I provides that no member of the Board shall participate in deciding a matter in a judicial capacity if that member would be disqualified for any cause to act as a juror upon the trial of the same matter. A member of a quasi-judicial board must be indifferent between the parties."),
      N([ r("The record of the September 10 deliberations shows the Vice Chair acting as an advocate for the application rather than as an adjudicator of it. He advanced a hardship theory the applicant had not argued. He supplied expert opinion on property values that the applicant had not offered. And in raising the possibility that future owners of single-family lots might remove trees, a matter with no bearing on any of the five statutory criteria, he remarked that "), i("“the applicant beat me to”"), r(" the point, indicating that he had arrived at the hearing with arguments in support of the application prepared in advance and was tracking which of them the applicant had already made. "), blank("Quote the remark exactly as it appears on the recording."), r(" The Movants do not allege bad faith, and do not know whether the Vice Chair had any contact with the applicant outside the public hearing. They raise the matter at the earliest opportunity available to them, since the conduct occurred during deliberation after the hearing was closed. "), i("Webster v. Town of Candia"), r(", 146 N.H. 430 (2001).") ]),
      N("The Movants request that the Vice Chair disclose on the record any communication with the applicant, its principals, or its engineer concerning this application outside the public hearing, and any business or professional relationship with them; and that he recuse himself from the vote on this motion and from any rehearing. Participation by a member who should have been disqualified invalidates the decision regardless of how the remaining members voted. Winslow v. Town of Holderness Planning Board, 125 N.H. 262 (1984)."),
      P([ b("Ground 7. The dissent identified the same failures.") ]),
      N("Member Carnevale's stated reasons for voting against approval, the absence of hardship, the absence of any assessment of the effect on property values, and the failure to observe the spirit of the ordinance, track Grounds 2 through 4 above and confirm that the deficiencies in the applicant's showing were apparent on the record before the Board."),

      H("IV. Incorporation of the Record"),
      N("The Movants incorporate by reference their Memorandum in Opposition dated September 9, 2026 and their written testimony, both of which are in the Board's file, and preserve every ground stated in them."),

      H("V. Relief Requested"),
      P("WHEREFORE, the Movants respectfully request that the Board:"),
      N("Grant a rehearing of its September 10, 2026 decision in Case No. ZBA2026-063;"),
      N("On rehearing, require the applicant to carry its burden on each criterion of RSA 674:33 with evidence in the record, and deny the application;"),
      N("In the alternative, reopen the public hearing so that the parties may address the slope information and the property-value opinion introduced during deliberation;"),
      N("Direct that the basis for treating the slope deduction as a hardship, and the basis of the property-value opinion, be stated on the record;"),
      N("Direct that Vice Chair St. Pierre not participate in the vote on this motion or in any rehearing; and"),
      N("Grant such further relief as is just."),

      new Paragraph({ text: "", spacing: { after: 200 } }),
      P("Respectfully submitted,"),
      new Paragraph({ text: "", spacing: { after: 300 } }),
      P("______________________________          ______________________________"),
      P([ r("Nickolas J. Levasseur                                    Alison Famisan-Levasseur") ]),
      P("30 Mystic Street, Manchester, NH 03103          30 Mystic Street, Manchester, NH 03103"),
      P("(603) 361-3828"),
      P([ r("Date: "), blank("date of filing") ]),
      new Paragraph({ text: "", spacing: { after: 160 } }),
      P([ blank("Additional signature lines for abutters who join, or delete") ]),

      H("Certificate of Service"),
      P([ r("I certify that on "), blank("date"), r(" a copy of this motion was sent by first-class mail and email to the applicant, T&L 2018, LLC, 156 Lowell Road, Hudson, NH 03051, and to its agent, The Dubay Group, Inc., c/o Doug MacGuire, 136 Harvey Road, Bldg B101, Londonderry, NH 03053.") ]),
      new Paragraph({ text: "", spacing: { after: 240 } }),
      P("______________________________"),
      P("Nickolas J. Levasseur"),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Titus_Ave_Motion_for_Rehearing.docx', buf));
