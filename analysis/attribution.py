"""Who said it.

The machine transcript carries no speaker labels, so every statement attributed
to Vice Chair St. Pierre has to be anchored to something. This file records the
anchor for each case and the resulting confidence, fixed before any statement in
that case was classified.

Anchor types, strongest first:
  NAMED     the Chair or a member addresses him by name immediately before or
            during the passage, or staff answers him by name
  FORMULA   no name, but the closing recitation he uses in every case he speaks
            findings on: "no one benefits more from a denial than the applicant
            will from the approval"
  NONE      neither; the findings in the case may have been given by another
            member, and nothing from the case is classified

The rule that follows from this: statements in NONE cases are not counted at
all. A classification built on a guessed speaker would be worse than no
classification, because it could not survive being checked against the video.

Attributions rest on first names heard on a machine transcript and should be
confirmed against the City's recording before any of this is filed.
"""

ATTRIBUTION = {
    # case        confidence  anchor
    "2026-079": ("NONE",    "no name; findings at 0:21:04 give no signature phrase"),
    "2026-055": ("NAMED",   "Chair: “Craig?” at 0:33:50, immediately before the panels "
                            "question; Carnevale at 1:02:11: “tie into what Craig said”"),
    "2026-063": ("NAMED",   "a member at 1:58:33: “Craig, could you please repeat that, "
                            "you're going really fast” during the findings"),
    "2026-072": ("NONE",    "no name; findings at 2:09:56 carry no signature phrase"),
    "2026-074": ("NONE",    "no name; the word before the findings transcribes as “Mike”, "
                            "which is staff, and the formula is absent"),
    "2026-075": ("NONE",    "no name; findings at 2:33:17 carry no signature phrase"),
    "2026-076": ("NAMED",   "Chair: “Anyone else? Craig?” at 2:45:16; staff answers "
                            "“Craig, you're correct” at 2:47:55"),
    "2026-077": ("NAMED",   "a member at 3:17:02 and again at 3:24:16: “I think we can be "
                            "clear, Craig”, immediately before he states the findings"),
    "2026-078": ("NONE",    "no name. Caution: the applicant's principal is Matt Brown of "
                            "Brown Capital LLC, so “Matt” in this case is usually the "
                            "applicant and not Member Carnevale"),
    "2026-083": ("NAMED",   "Chair: “Craig, go ahead” at 3:54:20, opening the findings"),
    "2026-080": ("FORMULA", "no name; findings at 4:07:53 carry the full recitation and "
                            "the “another very unique lot” phrasing"),
    "2026-081": ("NONE",    "no name; findings at 4:16:48 carry no signature phrase"),
    "2026-082": ("NONE",    "no name; findings at 4:34:25 are abbreviated and carry no "
                            "signature phrase"),
}

COUNTED = [c for c, (conf, _) in ATTRIBUTION.items() if conf in ("NAMED", "FORMULA")]

if __name__ == "__main__":
    for case, (conf, why) in ATTRIBUTION.items():
        print(f"{case}  {conf:8}  {why}")
    print(f"\ncounted: {len(COUNTED)} of {len(ATTRIBUTION)} cases -> {', '.join(sorted(COUNTED))}")
