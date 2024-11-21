import { A1_CARD_ID_MAP, MISSING_NO_CARD } from '../constants/cards/a1';
import {
  CHARIZARD_PACK_CARD_ID_LIST,
  MEWTWO_PACK_CARD_ID_LIST,
  PIKACHU_PACK_CARD_ID_LIST,
} from '../constants/packs/a1';

import { NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX } from '../../constant/service';
import RandomIdGenerator from '../logics/RandomIdGenerator';
import RandomPickerByTuple from '../logics/RandomPickerByTuple';

const rarityGenerators = NORMAL_PACK_RARITY_PERCENTAGE_LIST_BY_INDEX.map(
  tuple => new RandomPickerByTuple(tuple)
);
const packIdGeneratorsRecord: Record<PackType, RandomIdGenerator<Rarity>[]> = {
  charizard: rarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(CHARIZARD_PACK_CARD_ID_LIST[idx], generator)
  ),
  mewtwo: rarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(MEWTWO_PACK_CARD_ID_LIST[idx], generator)
  ),
  pikachu: rarityGenerators.map(
    (generator, idx) =>
      new RandomIdGenerator(PIKACHU_PACK_CARD_ID_LIST[idx], generator)
  ),
};

export default function getPack(type: PackType) {
  const generators = packIdGeneratorsRecord[type];
  return generators.map(generator => {
    const nowId = generator.getId();
    if (!nowId) return MISSING_NO_CARD;
    const nowCard = A1_CARD_ID_MAP.get(nowId);
    if (!nowCard) return MISSING_NO_CARD;
    return nowCard;
  });
}
