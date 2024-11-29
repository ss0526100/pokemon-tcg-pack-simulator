import {
  CHARIZARD_RARE_PACK_CROWN_PERCENT,
  CHARIZARD_RARE_PACK_S1_PERCENT,
  CHARIZARD_RARE_PACK_S2_PERCENT,
  CHARIZARD_RARE_PACK_S3_PERCENT,
  MEWTWO_RARE_PACK_CROWN_PERCENT,
  MEWTWO_RARE_PACK_S1_PERCENT,
  MEWTWO_RARE_PACK_S2_PERCENT,
  MEWTWO_RARE_PACK_S3_PERCENT,
  PIKACHU_RARE_PACK_CROWN_PERCENT,
  PIKACHU_RARE_PACK_S1_PERCENT,
  PIKACHU_RARE_PACK_S2_PERCENT,
  PIKACHU_RARE_PACK_S3_PERCENT,
} from '../server/constants/packs/a1';

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

export const RARE_PACK_RARITY_PERCENTAGE_TUPLES: RarePackPercentTuple = [
  ['rare', 0.05],
  ['normal', 99.95],
];

export const CHARIZARD_RARE_PACK_PERCENT_TUPLES: RarityPercentTuple = [
  ['s1', CHARIZARD_RARE_PACK_S1_PERCENT],
  ['s2', CHARIZARD_RARE_PACK_S2_PERCENT],
  ['s3', CHARIZARD_RARE_PACK_S3_PERCENT],
  ['crown', CHARIZARD_RARE_PACK_CROWN_PERCENT],
];

export const PIKACHU_RARE_PACK_PERCENT_TUPLES: RarityPercentTuple = [
  ['s1', PIKACHU_RARE_PACK_S1_PERCENT],
  ['s2', PIKACHU_RARE_PACK_S2_PERCENT],
  ['s3', PIKACHU_RARE_PACK_S3_PERCENT],
  ['crown', PIKACHU_RARE_PACK_CROWN_PERCENT],
];

export const MEWTWO_RARE_PACK_PERCENT_TUPLES: RarityPercentTuple = [
  ['s1', MEWTWO_RARE_PACK_S1_PERCENT],
  ['s2', MEWTWO_RARE_PACK_S2_PERCENT],
  ['s3', MEWTWO_RARE_PACK_S3_PERCENT],
  ['crown', MEWTWO_RARE_PACK_CROWN_PERCENT],
];

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
