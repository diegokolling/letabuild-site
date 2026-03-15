// ============================================================
// Tutorial Content — Combined from all parts
// Merges TUTORIAL_PART1, TUTORIAL_PART2, TUTORIAL_PART3
// ============================================================

const TUTORIAL_CONTENT = Object.assign({},
  typeof TUTORIAL_PART1 !== 'undefined' ? TUTORIAL_PART1 : {},
  typeof TUTORIAL_PART2 !== 'undefined' ? TUTORIAL_PART2 : {},
  typeof TUTORIAL_PART3 !== 'undefined' ? TUTORIAL_PART3 : {}
);
