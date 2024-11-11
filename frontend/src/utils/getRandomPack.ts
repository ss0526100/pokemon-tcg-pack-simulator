import {
  A1_CARD_ID_MAP,
  A1_CARD_POOL_ID_LIST,
  MISSING_NO_CARD,
} from '../constant/card';

import { NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX } from '../constant/service';
import getRandomElement from './getRandomElement';
import getRandomStrByPercentFunc from './getRandomStrByPercentFunc';

const RANDOM_NORMAL_PACK_RARITY_FUNCS =
  NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRarity = () =>
  RANDOM_NORMAL_PACK_RARITY_FUNCS.map(func => func());

const getRandomPack = (type: A1PackType = 'charizard') => {
  const cardPoolById = A1_CARD_POOL_ID_LIST[type];
  const map = A1_CARD_ID_MAP;

  const randomPackRarity = getRandomPackRarity();

  const randomPack = randomPackRarity.map((rarity, idx) => {
    const randomCardIds = cardPoolById[idx][rarity];
    const randomId = getRandomElement(randomCardIds);
    if (randomId === undefined) return MISSING_NO_CARD;
    return map.get(randomId) || MISSING_NO_CARD;
  });
  return randomPack;
};

export const getRandomPacks = (cnt: number = 1) => {
  const packs = Array.from({ length: Math.max(Math.abs(cnt), 1) }).map(() =>
    getRandomPack()
  );
  return packs;
};

export default getRandomPack;
