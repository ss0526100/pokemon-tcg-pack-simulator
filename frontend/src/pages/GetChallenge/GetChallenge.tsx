import {
  A1_CARD_ID_MAP,
  A1_CARD_POOL_ID_LIST,
  MISSING_NO_CARD,
} from '../../constant/card';
import { useRef, useState } from 'react';

import COLOR from '../../constant/colors';
import ChooseChallenge from './ChooseChallenge/ChooseChallenge';
import { GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX } from '../../constant/service';
import GameLayout from '../../layouts/GameLayout/GameLayout';
import LockedLock from '../../components/svgs/LockedLock';
import OpenedLock from '../../components/svgs/OpenedLock';
import PlayChallenge from './PlayChallenge/PlayChallenge';
import PokeCard from '../../components/svgs/PokeCard';
import Refresh from '../../components/svgs/Refresh';
import ToolbarItem from '../../components/ToolbarItem/ToolbarItem';
import { getCardInWhereA1Pack } from '../../utils/getCardInWhereA1Pack';
import getRandom from '../../utils/getRandom';
import getRandomElement from '../../utils/getRandomElement';
import getRandomStrByPercentFunc from '../../utils/getRandomStrByPercentFunc';
import { useNavigate } from 'react-router-dom';
import useScrollLock from '../../hooks/useScrollHook';

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
  Array.from({ length: 10 }).map(() => getRandomPack(targetId));

const initRandomPack = getRandomPacks();
const initPack = initRandomPack[0];

type Phase = 'select' | 'play';
export default function GetChallenge() {
  const [packs, setPacks] = useState<Pack[]>(initRandomPack);
  const [selectedPack, setSelectedPack] = useState<Pack>(initPack);
  const [phase, setPhase] = useState<Phase>('select');
  const contentRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { isLocked, toggleScrollLock } = useScrollLock();

  const goSelect = () => setPhase('select');
  const selectPack = (pack: Pack) => {
    setSelectedPack(pack);
    setPhase('play');
  };

  const refreshPacks = () => {
    setPacks(getRandomPacks());
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <GameLayout>
      <GameLayout.Content>
        {phase === 'select' && (
          <ChooseChallenge
            onSelect={selectPack}
            packs={packs}
            ref={contentRef}
          />
        )}
        {phase === 'play' && (
          <PlayChallenge pack={selectedPack} goSelect={goSelect} />
        )}
      </GameLayout.Content>
      <GameLayout.Toolbar>
        <GameLayout.Toolbar.ToolbarItemContainer>
          <ToolbarItem
            svg={<PokeCard fill={COLOR.PRIMARY_COLOR} size={50} />}
            description='팩 개봉하기'
            onClick={() => navigate('/')}
          />
        </GameLayout.Toolbar.ToolbarItemContainer>

        <GameLayout.Toolbar.ToolbarItemContainer>
          {phase === 'select' && (
            <ToolbarItem
              svg={<Refresh fill={COLOR.PRIMARY_COLOR} size={50} />}
              description='목록 새로고침'
              onClick={refreshPacks}
            />
          )}

          {phase === 'select' && !isLocked && (
            <ToolbarItem
              svg={<OpenedLock fill={COLOR.PRIMARY_COLOR} size={50} />}
              description='외부 스크롤 잠그기'
              onClick={toggleScrollLock}
            />
          )}

          {phase === 'select' && isLocked && (
            <ToolbarItem
              svg={<LockedLock fill={COLOR.PRIMARY_COLOR} size={50} />}
              description='외부 스크롤 풀기'
              onClick={toggleScrollLock}
            />
          )}
        </GameLayout.Toolbar.ToolbarItemContainer>
      </GameLayout.Toolbar>
    </GameLayout>
  );
}
