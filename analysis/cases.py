"""The thirteen cases heard by the Manchester ZBA on September 10, 2026, in the
order they were actually taken up, with the span of the City's recording each
occupies. Boundaries are set at the Clerk's "our next case this evening is ..."
announcement and were read off the machine transcript; they are approximate to
a few seconds and are used only to slice the transcript, never as evidence.

`stakes` is a coarse, stated-in-advance grouping so that like is compared with
like. A 13-unit development and a rear-yard deck do not offer the same room for
a board member to advocate, and a comparison that ignores that is worthless.
  major  -- a new use or new density the district does not permit
  medium -- an addition, a new lot, or a use change on an existing property
  minor  -- setbacks, accessory structures, signage, seasonal use
"""

CASES = [
    # case         address                      start      end        stakes    agenda item
    ("2026-079", "Baker Street, TM 735 Lot 19", "0:08:02", "0:22:33", "minor",  11),
    ("2026-055", "218 South Lincoln Street",    "0:22:33", "1:05:18", "major",   3),
    ("2026-063", "26 Titus Avenue",             "1:05:18", "2:00:56", "major",   4),
    ("2026-072", "50 Delia Drive",              "2:00:56", "2:19:34", "medium",  5),
    # recess 2:19:34 - 2:21:48
    ("2026-074", "191 Portsmouth Avenue",       "2:21:48", "2:26:19", "minor",   6),
    ("2026-075", "52 Faith Lane",               "2:26:19", "2:35:42", "medium",  7),
    ("2026-076", "801 Hanover Street",          "2:35:42", "2:59:07", "major",   8),
    ("2026-077", "58 Myrtle Street",            "2:59:07", "3:27:43", "medium",  9),
    ("2026-078", "26 Sullivan Street",          "3:27:43", "3:48:01", "major",  10),
    ("2026-083", "248 Vinton Street",           "3:48:01", "3:55:46", "minor",  15),  # taken out of order
    ("2026-080", "374 Thornton Street",         "3:55:46", "4:11:26", "medium", 12),
    ("2026-081", "975 Cedar Street",            "4:11:26", "4:19:06", "minor",  13),
    ("2026-082", "800 Gold Street",             "4:19:06", "4:37:00", "medium", 14),
]
