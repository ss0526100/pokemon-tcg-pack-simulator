import * as S from './PackSimulator.style';

import { useCallback, useState } from 'react';

import PackOpen from '../PackOpen/PackOpen';
import PackSelect from '../PackSelect/PackSelect';
import getRandomPack from '../../utils/getRandomPack';

const initPack = getRandomPack();

type Phase = 'select' | 'open' | 'result';
export default function PackSimulator() {
  const [cardPack, setCardPack] = useState<CardInfo[]>(initPack);
  const [nowPackType, setNowPackType] = useState<A1PackType>('charizard');
  const [phase, setPhase] = useState<Phase>('select');
  const goOpenPhase = useCallback((packType: A1PackType) => {
    const randomPack = getRandomPack(packType);
    setCardPack(randomPack);
    setPhase('open');
    setNowPackType(packType);
  }, []);

  const reopen = () => {
    const randomPack = getRandomPack(nowPackType);
    setCardPack(randomPack);
  };

  const goSelect = () => {
    setPhase('select');
  };
  return (
    <section css={S.layout}>
      {phase === 'select' && (
        <PackSelect onSelect={goOpenPhase} startPackType={nowPackType} />
      )}
      {phase === 'open' && (
        <PackOpen
          cardInfos={cardPack}
          goOpen={reopen}
          goSelect={goSelect}
          nowPackType={nowPackType}
        />
      )}
    </section>
  );
}
