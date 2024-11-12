import {
  A1_CARD_ID_MAP,
  A1_CARD_POOL_ID_LIST,
  MISSING_NO_CARD,
} from '../../constant/card';

import ChooseChallenge from './ChooseChallenge/ChooseChallenge';
import { GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX } from '../../constant/service';
import GameLayout from '../../layouts/GameLayout/GameLayout';
import PlayChallenge from './PlayChallenge/PlayChallenge';
import { getCardInWhereA1Pack } from '../../utils/getCardInWhereA1Pack';
import getRandom from '../../utils/getRandom';
import getRandomElement from '../../utils/getRandomElement';
import getRandomStrByPercentFunc from '../../utils/getRandomStrByPercentFunc';
import { useState } from 'react';

const RANDOM_NORMAL_PACK_RARITY_FUNCS =
  GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRarity = () =>
  RANDOM_NORMAL_PACK_RARITY_FUNCS.map(func => func());

const getRandomPackType = () =>
  ['charizard', 'pikachu', 'mewtwo'].sort(
    () => getRandom() - 0.5
  )[0] as PackType;

const getRandomPack = (targetId?: string) => {
  const packType = targetId
    ? getCardInWhereA1Pack(targetId)[0] || getRandomPackType()
    : getRandomPackType();
  const cardPoolById = A1_CARD_POOL_ID_LIST[packType];
  const map = A1_CARD_ID_MAP;

  const randomPackRarity = getRandomPackRarity();

  const randomPack = randomPackRarity.map((rarity, idx) => {
    if (idx === 4 && targetId && map.get(targetId))
      return map.get(targetId) || MISSING_NO_CARD;

    const randomCardIds = cardPoolById[idx][rarity];
    const randomId = getRandomElement(randomCardIds);

    if (randomId === undefined) return MISSING_NO_CARD;
    return map.get(randomId) || MISSING_NO_CARD;
  });
  return randomPack.sort(() => getRandom() - 0.5);
};

const getRandomPacks = (targetId?: string) =>
  Array.from({ length: 100 }).map(() => getRandomPack(targetId));

const initRandomPack = getRandomPacks();
const initPack = initRandomPack[0];

type Phase = 'select' | 'play';
export default function GetChallenge() {
  const [packs, setPacks] = useState<Pack[]>(initRandomPack);
  const [selectedPack, setSelectedPack] = useState<Pack>(initPack);
  const [phase, setPhase] = useState<Phase>('select');

  const goSelect = () => setPhase('select');
  const selectPack = (pack: Pack) => {
    setSelectedPack(pack);
    setPhase('play');
  };

  return (
    <GameLayout>
      <GameLayout.Content>
        {phase === 'select' && (
          <ChooseChallenge onSelect={selectPack} packs={packs} />
        )}
        {phase === 'play' && (
          <PlayChallenge pack={selectedPack} goSelect={goSelect} />
        )}
      </GameLayout.Content>
    </GameLayout>
  );
}
