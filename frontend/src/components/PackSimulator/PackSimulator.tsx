import * as S from './PackSimulator.style';

import { useCallback, useState } from 'react';

import PackOpen from '../PackOpen/PackOpen';
import PackSelect from '../PackSelect/PackSelect';
import StatisticsInfo from '../StatisticsInfo/StatisticsInfo';
import getRandomPack from '../../utils/getRandomPack';
import increaseCntMap from '../../utils/increaseMap';
import useCardCount from '../../hooks/atoms/useCardCount';
import usePackCount from '../../hooks/atoms/usePackCount';
import useRarityCntMap from '../../hooks/atoms/useRarityCntMap';

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

  const setCardCount = useCardCount()[1];
  const setPackCount = usePackCount()[1];
  const setRarityCntMap = useRarityCntMap()[1];

  const goOpenPhase = useCallback(
    (packType: A1PackType) => {
      setOpenPackCnt(1);
      setPackCount(prev => prev + 1);
      setCardCount(prev => prev + 5);
      const randomPack = getRandomPack(packType);
      setRarityCntMap(prevMap => {
        const nextMap = new Map([...prevMap]);
        randomPack.forEach(card => increaseCntMap(nextMap, card.grade));
        return nextMap;
      });
      setCardPack(randomPack);
      setPhase('open');
      setNowPackType(packType);
    },
    [setPackCount, setCardCount, setRarityCntMap]
  );

  const goOpenPhaseWithTen = useCallback(
    (packType: A1PackType) => {
      setOpenPackCnt(10);
      setPackCount(prev => prev + 10);
      setCardCount(prev => prev + 50);
      const randomPack = getTenPack(packType);
      setRarityCntMap(prevMap => {
        const nextMap = new Map([...prevMap]);
        randomPack.forEach(card => increaseCntMap(nextMap, card.grade));
        return nextMap;
      });
      setCardPack(randomPack);
      setPhase('open');
      setNowPackType(packType);
    },
    [setPackCount, setCardCount, setRarityCntMap]
  );

  const reopen = () => {
    if (openPackCnt === 1) return goOpenPhase(nowPackType);
    if (openPackCnt === 10) return goOpenPhaseWithTen(nowPackType);
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
