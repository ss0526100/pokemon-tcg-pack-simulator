import { A1_CARD_ID_MAP, MISSING_NO_CARD } from '@_server/constants/cards/a1';
import {
  CHARIZARD_PACK_CARD_ID_LIST,
  MEWTWO_PACK_CARD_ID_LIST,
  PIKACHU_PACK_CARD_ID_LIST,
} from '@_server/constants/packs/a1';
import {
  CHARIZARD_RARE_PACK_PERCENT_TUPLES,
  IS_RARE_PACK_PERCENTAGE_TUPLES,
  MEWTWO_RARE_PACK_PERCENT_TUPLES,
  NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX,
  PIKACHU_RARE_PACK_PERCENT_TUPLES,
} from '@_constant/service';

import RandomIdGenerator from '@_server/logics/RandomIdGenerator';
import RandomPickerByTuple from '@_server/logics/RandomPickerByTuple';

const isRarePackPicker = new RandomPickerByTuple(
  IS_RARE_PACK_PERCENTAGE_TUPLES
);

const charizardRarePackRarityGenerator = new RandomPickerByTuple(
  CHARIZARD_RARE_PACK_PERCENT_TUPLES
);
const pikachuRarePackRarityGenerator = new RandomPickerByTuple(
  PIKACHU_RARE_PACK_PERCENT_TUPLES
);
const mewtwoRarePackRarityGenerator = new RandomPickerByTuple(
  MEWTWO_RARE_PACK_PERCENT_TUPLES
);

const normalPackRarityGenerators =
  NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX.map(
    tuple => new RandomPickerByTuple(tuple)
  );

const rarePackIdGenerator: Record<PackType, RandomIdGenerator<Rarity>> = {
  charizard: new RandomIdGenerator(
    CHARIZARD_PACK_CARD_ID_LIST[4],
    charizardRarePackRarityGenerator
  ),
  pikachu: new RandomIdGenerator(
    PIKACHU_PACK_CARD_ID_LIST[4],
    pikachuRarePackRarityGenerator
  ),
  mewtwo: new RandomIdGenerator(
    MEWTWO_PACK_CARD_ID_LIST[4],
    mewtwoRarePackRarityGenerator
  ),
};

const normalPackIdGeneratorsRecord: Record<
  PackType,
  RandomIdGenerator<Rarity>[]
> = {
  charizard: normalPackRarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(CHARIZARD_PACK_CARD_ID_LIST[idx], generator)
  ),
  mewtwo: normalPackRarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(MEWTWO_PACK_CARD_ID_LIST[idx], generator)
  ),
  pikachu: normalPackRarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(PIKACHU_PACK_CARD_ID_LIST[idx], generator)
  ),
};

const getNormalPack = (type: PackType) => {
  const generators = normalPackIdGeneratorsRecord[type];
  return generators.map(generator => {
    const nowId = generator.getId();
    if (!nowId) return MISSING_NO_CARD;
    const nowCard = A1_CARD_ID_MAP.get(nowId);
    if (!nowCard) return MISSING_NO_CARD;
    return nowCard;
  });
};

const emptyPack = Array.from({ length: 5 });
const getRarePack = (type: PackType) => {
  const generator = rarePackIdGenerator[type];
  const result = emptyPack.map(() => {
    const nowId = generator.getId();
    if (!nowId) return MISSING_NO_CARD;
    const nowCard = A1_CARD_ID_MAP.get(nowId);
    if (!nowCard) return MISSING_NO_CARD;
    return nowCard;
  });
  return result;
};
export default function getPack(type: PackType) {
  const isRarePack = isRarePackPicker.getRandomValue();
  if (isRarePack) return getRarePack(type);
  return getNormalPack(type);
}
