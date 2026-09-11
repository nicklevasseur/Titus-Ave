"""Every substantive statement by Vice Chair St. Pierre at the two hearings of
September 10, 2026, each classified once. The pie charts are computed from
these lists, so the counts and the appendix can never drift apart.

Counting rule: one entry per distinct assertion, question, or finding. Excluded
are purely procedural remarks (recognizing a speaker, stating the motion, "I got
you later") and the bare yes/no recitation of a statutory finding that adds no
reasoning beyond what is already counted.

The Vice Chair states the findings of fact in nearly every case, and he does it
from a fixed script: the variance is not contrary to the public interest, the
spirit is observed, no one benefits more from a denial than the applicant will
from the approval, property values will not be diminished, and literal
enforcement creates an unnecessary hardship "for the applicant." He recited that
same formula at 50 Delia Drive, 801 Hanover Street, 374 Thornton Street, 800
Gold Street and 248 Vinton Street on the same evening. It is therefore excluded
in BOTH cases -- it shows a habit of the Board's practice, not anything done to
this applicant. Excluding it at South Lincoln but counting it at Titus Avenue
would have measured the instrument instead of the conduct.

Category indexes match CATS in make_charts.py.
Timestamps are hours:minutes:seconds from the start of the City's recording.
"""

TITUS_ITEMS = [
 ("1:20:06", "“in the redesign, you folks no longer need relief from dumpster location, townhouse parking drive, landscape or fence height?”", 1),
 ("1:20:45", "“thank you for your work in preserving the buffers”", 0),
 ("1:20:47", "“your work to give the neighbors the 25 feet”", 5),
 ("1:20:50", "“those will be left with the vegetation that’s there undisturbed more or less” — confirming", 1),
 ("1:55:45", "“one of the perennial things that we see in almost all of these cases is the trees and the cutting down”", 0),
 ("1:55:55", "“as the applicant had beat me to — when folks are doing a single family, they can cut all those trees down”", 0),
 ("1:56:02", "“some of the primary concerns that we hear over and over are addressed by the enforced buffer in a plan development such as this”", 4),
 ("1:56:07", "“I do think this property has some very unique characteristics”", 4),
 ("1:56:10", "“18% of it has slope that’s undevelopable by ordinance”", 0),
 ("1:56:13", "“by removing curb cuts into Calef, I think we improve safety tremendously”", 4),
 ("1:56:20", "“if they’re allowed to do … those five houses, is that more in benefit of safety? Is it more benefit of the neighbors, of the spirit?”", 6),
 ("1:56:31", "“I think this area is a transitional area in that neighborhood”", 6),
 ("1:56:38", "“MX1, R1, any of the densities, they’re not solely that. There are pieces that are exceptions”", 0),
 ("1:56:48", "“We see a large multi-dwelling unit here … the school, an entire side of it is cemetery”", 0),
 ("1:57:00", "“the added buffers proposed here do create a reasonable buffer of landscape to the other properties”", 4),
 ("1:57:04", "“I don’t think we’ve ever seen in my years on zoning another instance of properties that organically have such a large buffer”", 3),
 ("1:57:18", "“I do believe this is the best plan for this lot”", 6),
 ("1:57:22", "“It is singularly unique in its size at 1.1 acre”", 5),
 ("1:57:28", "“the buffers create a lot of alleviation to the problems we have”", 4),
 ("1:57:31", "“a lot of the other problems are addressed in the plan review process”", 0),
 ("1:57:48", "Findings: “It’s a tremendously unique lot at 1.1 acres”", 5),
 ("1:57:52", "Findings: “a lot of slopes including 18% that is undevelopable based on the city’s calculation of the slope review”", 0),
 ("1:57:58", "Findings: “the quieting of title on the paper street creates additional buffers … whether through the applicant or the other neighbours’ efforts”", 5),
 ("1:58:08", "Findings: “there are additional buffers then beyond what the plan development requires in itself”", 4),
 ("1:58:15", "Findings: “it reduces the need for curb cuts on Calef Road”", 0),
 ("1:58:18", "Findings: “and preserves existing on street parking”", 5),
 ("1:58:26", "Findings: the entrance is “off of Titus Avenue, which is in general safer to turn on to than the busier Calef”", 4),
 ("1:58:54", "Findings: “several other mixed or high density uses including the large development to the south, the cemetery and the Zion School”", 5),
 ("1:59:02", "Findings: “Also, I am a real estate broker”", 3),
 ("1:59:07", "Findings: “I’m not aware of any circumstance where a development of this nature in Manchester has diminished a property around it. I’ve never seen a report or evidence of that”", 3),
 ("1:59:16", "Findings: “In general, reasonably well thought out development increases values”", 3),
 ("1:59:18", "Findings: “a tremendous amount of thought has been put into this, further evidenced by the applicant taking an additional month to rework and reduce counts”", 6),
]

LINCOLN_ITEMS = [
 ("0:33:51", "“The three panels, though, it’s house unit one and unit two, correct? So you need four at a third unit?”", 1),
 ("0:36:24", "“So that’s not owner-occupied as you’re presenting?”", 1),
 ("0:36:30", "“Anything can or will be, but that’s not what it is”", 0),
 ("0:36:38", "“what was the reason that it was allowed to degrade to its current state?”", 1),
 ("1:00:04", "“The inability to subdivide’s not a hardship, it’s absurd”", 0),
 ("1:00:13", "“we have to remember that this was submitted under the old zoning … this neighborhood was R2”", 0),
 ("1:00:20", "“the specific spirit of that ordinance was a mix of single and duplexes”", 0),
 ("1:00:26", "“when we look at the applicant’s own exhibit, they’ve submitted that there’s 41 singles, five two families, and one three”", 0),
 ("1:00:35", "“this is clearly out of the spirit of the ordinance by definition”", 0),
 ("1:00:38", "“it’s also not in keeping with the character of this neighborhood”", 0),
 ("1:00:46", "“I just don’t see how creating the extra unit here is meeting the spirit of that or creating substantial justice to the neighbors”", 0),
 ("1:00:59", "“there’s no evidence that this was ever intended to be a third”", 0),
 ("1:01:06", "“a house panel’s gonna be needed to operate the one boiler system with the multi-zone, so that’s not gonna fly with me either”", 2),
 ("1:01:15", "“just the fact that they overbuilt this house, which has been stated that the applicant had their own hand in, that’s not a hardship”", 0),
 ("1:01:21", "“if it is to be considered it’s self-created”", 0),
 ("1:01:24", "“there’s no evidence here in my mind that the spirit’s observed or any substantial justice is done, let alone a hardship”", 0),
 ("1:01:41", "“it’s existed as a two family for well over 50 years … that kinda mutes that point in my book”", 0),
 ("1:01:55", "“you say you’ve vacated apartment number two. What’s going on in apartment number one?”", 1),
 ("1:02:57", "Findings: “I recognize that there are some points that the applicant has made that are factual”", 0),
 ("1:03:06", "Findings: “This property is one of the largest lots in this neighborhood”", 0),
 ("1:03:10", "Findings: “these are large units. We have a unit that’s 1,800 square feet”", 0),
 ("1:03:15", "Findings: “the applicant had a hand in building this and chose to create these large units”", 0),
 ("1:03:24", "Findings: “The neighborhood … as presented at this application is an R2 zone”", 0),
 ("1:03:27", "Findings: “the spirit of that is a mix of single families and duplexes”", 0),
 ("1:03:34", "Findings: “By the counts of the applicant’s own submission, there are 41 single families, five two families, and one three family … omitting the subject property”", 0),
 ("1:03:48", "Findings: “this is not in the spirit of the ordinance and substantial justice is not done by creating the density of a three family in this district”", 0),
 ("1:04:18", "Findings: “I tend to agree that a three family may not diminish the values of the property around it. So … I don’t believe that the property values will be diminished”", 0),
]
