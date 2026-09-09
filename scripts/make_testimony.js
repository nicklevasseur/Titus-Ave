const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');

const body = (text, opts={}) => new Paragraph({
  spacing: { after: 130, line: 320 },
  children: [ new TextRun({ text, size: 28, ...opts }) ]
});

const bodyRuns = (runs) => new Paragraph({
  spacing: { after: 130, line: 320 },
  children: runs
});

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 560, bottom: 560, left: 900, right: 900 }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [ new TextRun({ text: "Public Testimony — Nick Levasseur", bold: true, size: 32 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [ new TextRun({ text: "ZBA2026-063 — 26 Titus Avenue — Public Hearing, September 10, 2026", italics: true, size: 22, color: "555555" }) ]
      }),

      body("Chairman Breault, members of the Board."),

      body("My name is Nick Levasseur. I'm a former state representative from Ward 4. I now live in Ward 9 at 30 Mystic Street, in the house that my grandfather built when he came back from WWII. I'm the third generation of my family to live in this neighborhood. My five-year-old son, Atticus, is the fourth."),

      body("I'm not here as a neighbor with a grievance. I'm here because I've sat in rooms like this and I know the difference between an issue that is able to stand on its own merits and one that's hoping nobody looks under the hood. When it comes to the proposed 13-unit build at 26 Titus Avenue, I've looked under the hood and found the issue wanting."),

      body("I want to be clear about where I'm coming from, because I know what a hearing like this can sound like. I am in favor of more housing in this city. I have a five-year-old. I want more kids on Mystic Street for him to play with, and that means more families and more homes. The city agrees with me. It spent four years rewriting its zoning ordinance to make room for exactly that, and the new ordinance took effect on March 1 of this year. What I am not in favor of is changing the character of a neighborhood by variance, six months after the city decided, through that public process, what this corner should be."),

      body("As you know, state law dictates a five-part test for such cases. If even one fails, denial is the only remedy, regardless of anything else in the project's favor. I want to focus on two of those five that fail outright, and then on what this record does not contain."),

      bodyRuns([
        new TextRun({ text: "First: unnecessary hardship. ", bold: true, size: 28 }),
        new TextRun({ text: "The applicant's own site plans, submitted as part of this application, show this parcel supporting five single-family lots, fully conforming, no variance required. That's not my interpretation. It's their engineer's drawing. When an applicant's own plans prove a reasonable, conforming use already exists, the hardship argument collapses. This Board isn't being asked to rescue an unusable lot. It's being asked to approve the more profitable option over the compliant one.", size: 28 }),
      ]),

      bodyRuns([
        new TextRun({ text: "The law asks whether there is something special about this land, not about the neighborhood around it and not about the project the owner would prefer to build. The applicant hasn't pointed to anything. Not the shape of the lot, not the soils, not the frontage. The only physical feature their memo mentions is the slope, and their own five-lot plan builds on that slope. And this applicant bought the parcel from the City in 2024 as a single-family lot. That is what it was zoned then, and that is what the city chose to keep it this year.", size: 28 }),
      ]),

      bodyRuns([
        new TextRun({ text: "I'd ask the Board to sit with what it actually means to grant this. When the applicant's own engineer has drawn a fully conforming alternative on this same land, and the only stated reason to abandon it is that this proposal is more profitable, approving it isn't hardship relief. New Hampshire law is explicit on this point: a finding of unnecessary hardship cannot rest on profitability alone. This has been adjudicated in ", size: 28 }),
        new TextRun({ text: "Olszak v. Town of New Hampton", italics: true, size: 28 }),
        new TextRun({ text: ", 139 N.H. 723 (1995). The applicant hasn't offered any hardship beyond profitability. Under New Hampshire law, that's not hardship. That's a preference. And granting it anyway would be a favor, paid for by every neighbor who built by the rules.", size: 28 }),
      ]),

      bodyRuns([
        new TextRun({ text: "Second: spirit of the zoning ordinance. ", bold: true, size: 28 }),
        new TextRun({ text: "The City's own zoning review states plainly that townhouses are not a permitted building type in this district, and that multifamily dwellings are not a permitted use under Section 4.3-A.1.C. That makes this a use variance, not an area variance: a request to override what this entire district is designated for. This submission requests six simultaneous variances, touching the underlying use, building type, lot area, height in stories, height in feet, and parking location. That's not a technical tweak. That's rewriting the ordinance.", size: 28 }),
      ]),

      bodyRuns([
        new TextRun({ text: "And this ordinance is six months old. The Board of Mayor and Aldermen adopted the new Land Use Code in December, after a process that began in 2021, and it took effect March 1. That code decides, district by district, where townhouses and multifamily buildings belong. This parcel is not one of those places. That wasn't an oversight. The aldermen redrew this map knowing exactly what sits across Titus Avenue and next door. The applicant's engineer calls this project a “transition.” The city already decided where the transition is. It's the zoning line. This application asks you to move that line by private application, six months after the city drew it.", size: 28 }),
      ]),

      bodyRuns([
        new TextRun({ text: "Third, and briefly: ", bold: true, size: 28 }),
        new TextRun({ text: "the burden on every one of the five criteria is the applicant's, not ours. On two of them, the public interest and surrounding property values, this record contains nothing but the engineer's say-so. There is no traffic analysis for a corner already shared with a 96-unit complex. There is no appraisal, no market data, not one comparable sale, behind the claim that thirteen units in a single-family neighborhood won't touch the value of the homes around it. I'm not asking you to assume that it will. I'm asking you to notice that the applicant hasn't shown that it won't, and under the statute, that is their job. The homes around this parcel on Mystic Street, Titus Avenue, and Calef Road are single-family homes. For most of the families who own them, that house is the largest thing they will ever own. They are entitled to more than an assertion.", size: 28 }),
      ]),

      body("My grandfather was one of the first to build on Mystic Street. The neighborhood has changed a lot since then. The city has too. We have old boxes in the garage marked Grenier Field, the old name for the airport. This isn't about change. Change is good. It is necessary. This is about what it means to be a neighbor. What it means to be part of a community. As a community we established rules for how that change would happen. For how we would exist as neighbors. Those rules are imperfect, and sometimes they need some case-by-case adjustments. This application is not one of those times. It asks this Board to set aside, for one owner's benefit, a judgment the whole city just made. Approving it would call into question the legitimacy of the zoning ordinance itself, six months into its life."),

      bodyRuns([
        new TextRun({ text: "Mr. Chairman, members of the Board, I'd ask you to hold this application to the standard the ordinance sets, not the standard the applicant wishes it were. I was elected to the State House four times. Four times I swore an oath to the New Hampshire Constitution. Unlike many, I actually read it. I have a pocket copy at home signed by Speaker Terie Norelli and Senate President Sylvia Larsen. One passage that stuck with me was Part First, Article 38: ", size: 28 }),
        new TextRun({ text: "“A frequent recurrence to the fundamental principles of the constitution, and a constant adherence to justice... are indispensably necessary to preserve the blessings of liberty and good government.”", italics: true, size: 28 }),
        new TextRun({ text: " The five-part test in front of you tonight is this Board's fundamental principle. I'd ask you to keep recurring to it.", size: 28 }),
      ]),

      body("Thank you."),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Levasseur_Testimony_ZBA2026-063.docx', buf));
