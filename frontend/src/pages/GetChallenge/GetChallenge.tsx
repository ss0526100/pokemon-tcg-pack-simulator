import {
  A1_CARD_ID_MAP,
  MISSING_NO_CARD,
} from '../../server/constants/cards/a1';
import { useEffect, useRef, useState } from 'react';

import { A1_CARD_POOL_ID_LIST } from '../../server/constants/packs/a1';
import COLOR from '../../constant/colors';
import ChooseChallenge from './ChooseChallenge/ChooseChallenge';
import { GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX } from '../../constant/service';
import GameLayout from '../../layouts/GameLayout/GameLayout';
import LockedLockSvg from '../../components/svgs/LockedLockSvg';
import MobileTopRightHamburger from '../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import OpenedLockSvg from '../../components/svgs/OpenedLockSvg';
import PlayChallenge from './PlayChallenge/PlayChallenge';
import PokeBallSvg from '../../components/svgs/PokeBallSvg';
import RefreshSvg from '../../components/svgs/RefreshSvg';
import StatisticsInfo from '../PackSimulator/StatisticsInfo/StatisticsInfo';
import ToolbarItem from '../../components/ToolbarItem/ToolbarItem';
import fisherShuffle from '../../utils/fisherShuffle';
import { getCardInWhereA1Pack } from '../../utils/getCardInWhereA1Pack';
import getRandomElement from '../../utils/getRandomElement';
import getRandomStrByPercentFunc from '../../utils/getRandomStrByPercentFunc';
import isAppleDevice from '../../utils/isAppleDevice';
import { useNavigate } from 'react-router-dom';
import useScrollLock from '../../hooks/useScrollHook';
import { useTranslation } from 'react-i18next';

const RANDOM_NORMAL_PACK_RARITY_FUNCS =
  GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRarity = () =>
  RANDOM_NORMAL_PACK_RARITY_FUNCS.map(func => func());

const getRandomPackType = () =>
  fisherShuffle(['charizard', 'pikachu', 'mewtwo'])[0] as PackType;

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
  return fisherShuffle(randomPack);
};

const getRandomPacks = (targetId?: string) =>
  Array.from({ length: 10 }).map(() => getRandomPack(targetId));

const initRandomPack = getRandomPacks();
const initPack = initRandomPack[0];

type Phase = 'select' | 'play';
export default function GetChallenge() {
  const { t } = useTranslation();
  const [packs, setPacks] = useState<Pack[]>(initRandomPack);
  const [selectedPack, setSelectedPack] = useState<Pack>(initPack);
  const [phase, setPhase] = useState<Phase>('select');
  const contentRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { isLocked, toggleScrollLock } = useScrollLock();

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    title.textContent = t('title.get-challenge');
  }, [t]);

  const goSelect = () => setPhase('select');
  const selectPack = (pack: Pack) => {
    setSelectedPack(pack);
    setPhase('play');
  };

  const refreshPacks = () => {
    setPacks(getRandomPacks());
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: isAppleDevice() ? undefined : 'smooth',
      });
    }
  };
  return (
    <GameLayout>
      <MobileTopRightHamburger />
      <GameLayout.Content>
        {phase === 'select' && (
          <ChooseChallenge
            onSelect={selectPack}
            packs={packs}
            ref={contentRef}
            refreshPacks={refreshPacks}
          />
        )}
        {phase === 'play' && (
          <PlayChallenge pack={selectedPack} goSelect={goSelect} />
        )}
      </GameLayout.Content>
      <GameLayout.Toolbar>
        <GameLayout.Toolbar.ToolbarItemContainer>
          <ToolbarItem
            svg={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={50} />}
            description={t('get-challenge.toolbar.go-pack-simulator')}
            onClick={() => navigate('/')}
          />
          <StatisticsInfo />
        </GameLayout.Toolbar.ToolbarItemContainer>

        <GameLayout.Toolbar.ToolbarItemContainer>
          {phase === 'select' && (
            <ToolbarItem
              svg={<RefreshSvg fill={COLOR.PRIMARY_COLOR} size={50} />}
              description={t('get-challenge.toolbar.refresh-list')}
              onClick={refreshPacks}
            />
          )}

          {phase === 'select' && !isLocked && (
            <ToolbarItem
              svg={<OpenedLockSvg fill={COLOR.PRIMARY_COLOR} size={50} />}
              description={t('get-challenge.toolbar.lock-scroll')}
              onClick={toggleScrollLock}
            />
          )}

          {phase === 'select' && isLocked && (
            <ToolbarItem
              svg={<LockedLockSvg fill={COLOR.PRIMARY_COLOR} size={50} />}
              description={t('get-challenge.toolbar.unlock-scroll')}
              onClick={toggleScrollLock}
            />
          )}
        </GameLayout.Toolbar.ToolbarItemContainer>
      </GameLayout.Toolbar>
    </GameLayout>
  );
}
