const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');

const body = (text, opts={}) => new Paragraph({
  spacing: { after: 160, line: 340 },
  children: [ new TextRun({ text, size: 30, ...opts }) ]
});

const bodyRuns = (runs) => new Paragraph({
  spacing: { after: 160, line: 340 },
  children: runs
});

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 650, bottom: 650, left: 950, right: 950 }
      }
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [ new TextRun({ text: "Public Testimony \u2014 Nick Levasseur", bold: true, size: 32 }) ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [ new TextRun({ text: "ZBA2026-063 \u2014 26 Titus Avenue \u2014 Public Hearing, September 10, 2026", italics: true, size: 22, color: "555555" }) ]
      }),

      body("Chairman Breault, members of the Board."),

      body("My name is Nick Levasseur. I'm a former state representative from Ward 4. I now live in Ward 9 at 30 Mystic Street, in the house that my grandfather built when he came back from WWII. I'm the third generation of my family to live in this neighborhood. My five-year-old son, Atticus, is the fourth."),

      body("I'm not here as a neighbor with a grievance. I'm here because I've sat in rooms like this and I know the difference between an issue that is able to stand on its own merits and one that's hoping nobody looks under the hood. When it comes to the proposed 13-unit build at 26 Titus Avenue, I've looked under the hood and found the issue wanting."),

      body("As you know, state law dictates a five-part test for such cases. If even one fails, denial is the only remedy, regardless of anything else in the project's favor. I want to focus on two of those five that fail outright, as well as some significant procedural gaps in this submission."),

      bodyRuns([
        new TextRun({ text: "First: unnecessary hardship. ", bold: true, size: 30 }),
        new TextRun({ text: "The applicant's own site plans, submitted as part of this application, show this parcel supporting five single-family lots, fully conforming, no variance required. That's not my interpretation. It's their engineer's drawing. When an applicant's own plans prove a reasonable, conforming use already exists, the hardship argument collapses. This Board isn't being asked to rescue an unusable lot. It's being asked to approve the more profitable option over the compliant one.", size: 30 }),
      ]),

      bodyRuns([
        new TextRun({ text: "I'd ask the Board to sit with what it actually means to grant this. When the applicant's own engineer has drawn a fully conforming alternative on this same land, and the only stated reason to abandon it is that this proposal is more profitable, approving it isn't hardship relief. New Hampshire law is explicit on this point: a finding of unnecessary hardship cannot rest on profitability alone. This has been adjudicated in ", size: 30 }),
        new TextRun({ text: "Olszak v. Town of New Hampton", italics: true, size: 30 }),
        new TextRun({ text: ", 139 N.H. 723 (1995). The applicant hasn't offered any hardship beyond profitability. Under New Hampshire law, that's not hardship. That's a preference. And granting it anyway would be a subsidy, paid for by every neighbor who followed the rules.", size: 30 }),
      ]),

      bodyRuns([
        new TextRun({ text: "Second: spirit of the zoning ordinance. ", bold: true, size: 30 }),
        new TextRun({ text: "The City's own zoning review states plainly that townhouses are not a permitted building type in this district, and that multifamily dwellings are not a permitted use under Section 4.3-A.1.C. That makes this a use variance, not an area variance: a request to override what this entire district is designated for. Indeed, this submission requests six simultaneous variances, touching the underlying use, building type, lot area, height in stories, height in feet, and parking location. That's not a technical tweak. That's not in the spirit of the ordinance. That's rewriting the ordinance.", size: 30 }),
      ]),

      bodyRuns([
        new TextRun({ text: "One more thing, briefly: ", bold: true, size: 30 }),
        new TextRun({ text: "nothing in this record addresses traffic, parking demand, or lighting. Twenty spaces for what could be forty or more residents, on a corner already shared with a 96-unit development across the street, warranted at least a traffic-impact letter under this city's own Section 9.1. None was provided. Additionally, there is no drainage plan demonstrating compliance with the City's stormwater standards under Section 8.4, no Utilities Plan showing impact to sanitary sewer and public water supply as required for a complete application, no Soil Study under Section 9.2, an item of particular importance given the terrain, and no market analysis addressing impact to surrounding property values. The lack of these reviews does not necessarily rise to the level of failing the criterion that the values of surrounding properties are not diminished, but it does call into question how the applicant's engineer reached the conclusion that the project will have no negative impact. This leaves one to reasonably conclude that due diligence for impact has not been done, and that this submission is, at the very least, incomplete.", size: 30 }),
      ]),

      body("My grandfather was one of the first to build on Mystic Street. The neighborhood has changed a lot since then. The city has too. We have old boxes in the garage marked Grenier Field, the old name for the airport. This isn't about change. Change is good. It is necessary. This is about what it means to be a neighbor. What it means to be part of a community. As a community we established rules for how that change would happen. For how we would exist as neighbors. Those rules are imperfect, and sometimes they need some case-by-case adjustments. This application is not one of those times. Instead it represents an egregious, profit-motivated overreach that, should it be approved, would call into question the legitimacy of the zoning ordinance itself."),

      bodyRuns([
        new TextRun({ text: "Mr. Chairman, members of the Board, I'd ask you to hold this application to the standard the ordinance sets, not the standard the applicant wishes it were. I was elected to the State House four times. Four times I swore an oath to the New Hampshire Constitution. Unlike many, I actually read it. I have a pocket copy at home signed by Speaker Terie Norelli and Senate President Sylvia Larsen. One passage that stuck with me was Part First, Article 38: ", size: 30 }),
        new TextRun({ text: "\u201CA frequent recurrence to the fundamental principles of the constitution, and a constant adherence to justice... are indispensably necessary to preserve the blessings of liberty and good government.\u201D", italics: true, size: 30 }),
        new TextRun({ text: " The five-part test in front of you tonight is this Board's fundamental principle. I'd ask you to keep recurring to it.", size: 30 }),
      ]),

      body("Thank you."),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => require('fs').writeFileSync('../documents/Levasseur_Testimony_ZBA2026-063.docx', buf));
