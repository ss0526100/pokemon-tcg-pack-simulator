import { useEffect, useRef, useState } from 'react';

import { A1_CARD_POOL_ID_LIST } from '@_server/constants/packs/a1';
import BGMOnOffToolbar from '@_pages/ToolbarItems/BGMOnOffToolbar';
import COLOR from '@_constant/colors';
import CardCollectionToolbar from '@_pages/ToolbarItems/CardCollectionToolbar';
import ChooseChallenge from './ChooseChallenge/ChooseChallenge';
import { GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX } from '@_constant/service';
import GameLayout from '@_layouts/GameLayout/GameLayout';
import LockedLockSvg from '@_components/svgs/LockedLockSvg';
import { MISSING_NO_CARD } from '@_server/constants/cards/a1';
import MobileTopRightHamburger from '@_components/MobileTopRightHamburger/MobileTopRightHamburger';
import OpenedLockSvg from '@_components/svgs/OpenedLockSvg';
import PlayChallenge from './PlayChallenge/PlayChallenge';
import PokeBallSvg from '@_components/svgs/PokeBallSvg';
import RefreshSvg from '@_components/svgs/RefreshSvg';
import StatisticsInfo from '@_pages/PackSimulator/StatisticsInfo/StatisticsInfo';
import ToolbarItem from '@_components/ToolbarItem/ToolbarItem';
import fisherShuffle from '@_utils/fisherShuffle';
import getCardById from '@_server/apis/getCardById';
import { getCardInWhereA1Pack } from '@_utils/getCardInWhereA1Pack';
import getRandomElement from '@_utils/getRandomElement';
import getRandomStrByPercentFunc from '@_utils/getRandomStrByPercentFunc';
import isAppleDevice from '@_utils/isAppleDevice';
import { useNavigate } from 'react-router-dom';
import useScrollLock from '@_hooks/useScrollHook';
import { useTranslation } from 'react-i18next';

const RANDOM_NORMAL_PACK_RARITY_FUNCS =
  GET_CHALLENGE_RARITY_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRarity = () =>
  RANDOM_NORMAL_PACK_RARITY_FUNCS.map(func => func());

const getRandomPackType = () =>
  fisherShuffle(['charizard', 'pikachu', 'mewtwo'])[0] as PackType;

// 추후 원하는 카드 확정 겟챌린지를 위한 targetId 인자
const getRandomPack = (targetId?: string) => {
  const packType = targetId
    ? getCardInWhereA1Pack(targetId)[0] || getRandomPackType()
    : getRandomPackType();
  const cardPoolById = A1_CARD_POOL_ID_LIST[packType];

  const randomPackRarity = getRandomPackRarity();

  const randomPack = randomPackRarity.map((rarity, idx) => {
    if (idx === 4 && targetId && getCardById(targetId) !== MISSING_NO_CARD)
      return getCardById(targetId);

    const randomCardIds = cardPoolById[idx][rarity];
    const randomId = getRandomElement(randomCardIds) || '';

    return getCardById(randomId);
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
          <BGMOnOffToolbar />
          <StatisticsInfo />
          <CardCollectionToolbar />
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
