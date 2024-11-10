import * as S from './PackSimulator.style';

import { useCallback, useState } from 'react';

import PackOpen from '../PackOpen/PackOpen';
import PackSelect from '../PackSelect/PackSelect';
import StatisticsInfo from './StatisticsInfo/StatisticsInfo';
import getRandomPack from '../../utils/getRandomPack';

const initPack = getRandomPack();

type Phase = 'select' | 'open' | 'result';
const getTenPack = (packType: A1PackType) => {
  const randomPack = new Array(10)
    .fill(null)
    .map(() => getRandomPack(packType))
    .flat();

  return randomPack;
};
export default function PackSimulator() {
  const [cardPack, setCardPack] = useState<CardInfo[]>(initPack);
  const [nowPackType, setNowPackType] = useState<A1PackType>('charizard');
  const [openPackCnt, setOpenPackCnt] = useState<1 | 10>(1);
  const [phase, setPhase] = useState<Phase>('select');

  const goOpenPhase = useCallback((packType: A1PackType) => {
    setOpenPackCnt(1);
    const randomPack = getRandomPack(packType);
    setCardPack(randomPack);
    setPhase('open');
    setNowPackType(packType);
  }, []);

  const goOpenPhaseWithTen = useCallback((packType: A1PackType) => {
    setOpenPackCnt(10);
    const randomPack = getTenPack(packType);
    setCardPack(randomPack);
    setPhase('open');
    setNowPackType(packType);
  }, []);

  const reopen = () => {
    const randomPack =
      openPackCnt === 1 ? getRandomPack(nowPackType) : getTenPack(nowPackType);
    setCardPack(randomPack);
  };

  const goSelect = () => {
    setPhase('select');
  };

  return (
    <section css={S.layout}>
      {phase === 'select' && (
        <PackSelect
          onSelect={goOpenPhase}
          onTenSelect={goOpenPhaseWithTen}
          startPackType={nowPackType}
        />
      )}
      {phase === 'open' && (
        <PackOpen
          cardInfos={cardPack}
          goOpen={reopen}
          goSelect={goSelect}
          nowPackType={nowPackType}
        />
      )}
      <StatisticsInfo />
    </section>
  );
}
