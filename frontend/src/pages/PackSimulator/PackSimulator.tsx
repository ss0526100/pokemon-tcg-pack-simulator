import * as S from './PackSimulator.style';

import { useCallback, useState } from 'react';

import COLOR from '../../constant/colors';
import GameLayout from '../../layouts/GameLayout/GameLayout';
import PackOpen from './PackOpen/PackOpen';
import PackSelect from './PackSelect/PackSelect';
import PokeBall from '../../components/svgs/PokeCard';
import StatisticsInfo from './StatisticsInfo/StatisticsInfo';
import ToolbarItem from '../../components/ToolbarItem/ToolbarItem';
import { getRandomPacks } from '../../utils/getRandomPack';
import isMobile from '../../utils/isMobile';
import { useNavigate } from 'react-router-dom';

const initPack = getRandomPacks('charizard');

type Phase = 'select' | 'open' | 'result';

export default function PackSimulator() {
  const [cardPacks, setCardPacks] = useState<Pack[]>(initPack);
  const [nowPackType, setNowPackType] = useState<PackType>('charizard');
  const [nowOpenPackCnt, setNowOpenPackCnt] = useState<1 | 10>(1);
  const [phase, setPhase] = useState<Phase>('select');

  const navigate = useNavigate();

  const goOpenPhaseAtFirst = useCallback(
    (packType: PackType, packCount: 1 | 10) => {
      const randomPacks = getRandomPacks(packType, packCount);
      setNowOpenPackCnt(packCount);
      setCardPacks(randomPacks);
      setPhase('open');
      setNowPackType(packType);
    },
    []
  );

  const reopen = () => {
    const randomPacks = getRandomPacks(nowPackType, nowOpenPackCnt);
    setCardPacks(randomPacks);
    setPhase('open');
  };

  const goSelect = () => {
    setPhase('select');
  };

  return (
    <GameLayout>
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
          />
        )}
      </GameLayout.Content>
      <GameLayout.Toolbar>
        <GameLayout.Toolbar.ToolbarItemContainer>
          <ToolbarItem
            svg={<PokeBall fill={COLOR.PRIMARY_COLOR} size={50} />}
            description='겟챌린지 가기'
            onClick={() => navigate('/get-challenge')}
          />
        </GameLayout.Toolbar.ToolbarItemContainer>
        <GameLayout.Toolbar.ToolbarItemContainer>
          <StatisticsInfo />
        </GameLayout.Toolbar.ToolbarItemContainer>
      </GameLayout.Toolbar>

      <GameLayout.Description>
        {!isMobile() && (
          <span css={S.span}>
            PC환경에서는 키보드를 사용할 수 있습니다. <br />
            심지어 통계창이 켜져 있는 상태로도요! <br />
            <br />
            - 스페이스바 : 1장 구매 / 다음
            <br />
            - R : 10장 구매 / 팩 선택하러 가기
            <br />- 방향키 : 이전 / 다음
          </span>
        )}
        {isMobile() && (
          <span css={S.span}>
            PC에서도 이용 가능합니다!
            <br />
            <br />
            PC에서는 키보드를 활용한 추가 기능도 존재하니
            <br />한 번 확인해보세요!!
          </span>
        )}
      </GameLayout.Description>
    </GameLayout>
  );
}
