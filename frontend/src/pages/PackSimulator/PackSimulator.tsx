import * as S from './PackSimulator.style';

import { useCallback, useState } from 'react';

import PackOpen from './PackOpen/PackOpen';
import PackSelect from './PackSelect/PackSelect';
import StatisticsInfo from './StatisticsInfo/StatisticsInfo';
import { getRandomPacks } from '../../utils/getRandomPack';

const initPack = getRandomPacks('charizard');

type Phase = 'select' | 'open' | 'result';

export default function PackSimulator() {
  const [cardPacks, setCardPacks] = useState<Pack[]>(initPack);
  const [nowPackType, setNowPackType] = useState<PackType>('charizard');
  const [nowOpenPackCnt, setNowOpenPackCnt] = useState<1 | 10>(1);
  const [phase, setPhase] = useState<Phase>('select');

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
    <section css={S.layout}>
      {phase === 'select' && (
        <PackSelect onSelect={goOpenPhaseAtFirst} startPackType={nowPackType} />
      )}
      {phase === 'open' && (
        <PackOpen
          packs={cardPacks}
          goOpen={reopen}
          goSelect={goSelect}
          nowPackType={nowPackType}
        />
      )}
      <StatisticsInfo />
    </section>
  );
}
