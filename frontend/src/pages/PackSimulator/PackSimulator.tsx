import * as S from './PackSimulator.style';

import { useCallback, useEffect, useState } from 'react';

import AdjustPackCount from './AdjustPackCount/AdjustPackCount';
import COLOR from '../../constant/colors';
import GameLayout from '../../layouts/GameLayout/GameLayout';
import MobileTopRightHamburger from '../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import PackOpen from './PackOpen/PackOpen';
import PackSelect from './PackSelect/PackSelect';
import PokeBallSvg from '../../components/svgs/PokeBallSvg';
import StatisticsInfo from './StatisticsInfo/StatisticsInfo';
import ToolbarItem from '../../components/ToolbarItem/ToolbarItem';
import { getRandomPacks } from '../../utils/getRandomPack';
import isMobile from '../../utils/isMobile';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const initPack = getRandomPacks('charizard');

type Phase = 'select' | 'open' | 'result';

export default function PackSimulator() {
  const { t } = useTranslation();

  const [cardPacks, setCardPacks] = useState<Pack[]>(initPack);
  const [nowPackType, setNowPackType] = useState<PackType>('charizard');
  const [nowPackCount, setNowPackCount] = useState(1);
  const [phase, setPhase] = useState<Phase>('select');

  const navigate = useNavigate();

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    title.textContent = t('title.pack-simulator');
  }, [t]);

  const goOpenPhaseAtFirst = useCallback(
    (packType: PackType, count: number) => {
      const randomPacks = getRandomPacks(packType, count);
      setNowPackCount(count);
      setCardPacks(randomPacks);
      setPhase('open');
      setNowPackType(packType);
    },
    []
  );

  const reopen = () => {
    const randomPacks = getRandomPacks(nowPackType, nowPackCount);
    setCardPacks(randomPacks);
    setPhase('open');
  };

  const goSelect = () => {
    setPhase('select');
  };

  return (
    <GameLayout>
      <MobileTopRightHamburger>
        <MobileTopRightHamburger.Option
          svg={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
          description='안녕하세요'
        />
      </MobileTopRightHamburger>
      <GameLayout.Content>
        {phase === 'select' && (
          <PackSelect
            onSelect={goOpenPhaseAtFirst}
            startPackType={nowPackType}
          />
        )}
        {phase === 'open' && (
          <PackOpen
            packs={cardPacks}
            goOpen={reopen}
            goSelect={goSelect}
            nowPackType={nowPackType}
            isOnePack={nowPackCount === 1}
          />
        )}
      </GameLayout.Content>
      <GameLayout.Toolbar>
        <GameLayout.Toolbar.ToolbarItemContainer>
          <ToolbarItem
            svg={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={50} />}
            description={t('pack-simulator.toolbar.go-get-challenge')}
            onClick={() => navigate('/get-challenge')}
          />

          <StatisticsInfo />
        </GameLayout.Toolbar.ToolbarItemContainer>
        <GameLayout.Toolbar.ToolbarItemContainer>
          {phase === 'select' && <AdjustPackCount />}
        </GameLayout.Toolbar.ToolbarItemContainer>
      </GameLayout.Toolbar>

      <GameLayout.Description>
        {!isMobile() && (
          <span css={S.span}>
            {t('pack-simulator.description.pc-span-1')} <br />
            {t('pack-simulator.description.pc-span-2')} <br />
            <br />
            {t('pack-simulator.description.pc-span-3')}
            <br /> {t('pack-simulator.description.pc-span-4')}
            <br /> {t('pack-simulator.description.pc-span-5')}
          </span>
        )}
        {isMobile() && (
          <span css={S.span}>
            {t('pack-simulator.description.mobile-span-1')}
            <br />
            <br />
            {t('pack-simulator.description.mobile-span-2')}
            <br />
            {t('pack-simulator.description.mobile-span-3')}
          </span>
        )}
      </GameLayout.Description>
    </GameLayout>
  );
}
