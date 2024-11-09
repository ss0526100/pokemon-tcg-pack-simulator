export const RARE_GRADE_LIST: RareGrade[] = [
  'crown',
  's3',
  's2',
  's1',
  'r4',
  'r3',
  'r2',
  'r1',
];

type CardPercentList = [RareGrade, number][];

export const NORMAL_PACK_RARE_PERCENTAGE_LIST_BY_INDEX: CardPercentList[] = [
  [['r1', 100]],
  [['r1', 100]],
  [['r1', 100]],
  [
    ['crown', 0.04],
    ['s3', 0.222],
    ['s2', 0.5],
    ['s1', 2.572],
    ['r4', 1.666],
    ['r3', 5],
    ['r2', 90],
  ],
  [
    ['crown', 0.16],
    ['s3', 0.888],
    ['s2', 2],
    ['s1', 10.288],
    ['r4', 6.6664],
    ['r3', 20],
    ['r2', 60],
  ],
];
