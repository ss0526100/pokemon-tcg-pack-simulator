export const RARITY_GRADE_LIST: Rarity[] = [
  'crown',
  's3',
  's2',
  's1',
  'r4',
  'r3',
  'r2',
  'r1',
];

type RarityPercentTuple = [Rarity, number][];

export const NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX: RarityPercentTuple[] =
  [
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

export const GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX: RarityPercentTuple[] =
  [
    [['r1', 100]],
    [['r1', 100]],
    [['r1', 100]],
    [
      ['s2', 0.5],
      ['s1', 2.572],
      ['r4', 1.666],
      ['r3', 5],
      ['r2', 90],
    ],
    [
      ['s2', 30],
      ['s1', 30],
      ['r4', 40],
    ],
  ];
