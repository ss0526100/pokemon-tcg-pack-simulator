import { useCallback, useState } from 'react';

import { Global } from '@emotion/react';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackOpen from './components/PackOpen/PackOpen';
import PackSelect from './components/PackSelect/PackSelect';
import getRandomPack from './utils/getRandomPack';
import reset from './reset.style';

const initPack = getRandomPack();

type Phase = 'select' | 'open' | 'result';
function App() {
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
    <>
      <Global styles={reset} />
      <MainLayout>
        {/* {cardPack.map(c => c.cardName).join(' ')} */}
        {phase === 'select' && (
          <PackSelect onSelect={goOpenPhase} startPackType={nowPackType} />
        )}
        {phase === 'open' && (
          <PackOpen
            key={cardPack.map(c => c.id).join('')}
            cardInfos={cardPack}
            goOpen={reopen}
            goSelect={goSelect}
            nowPackType={nowPackType}
          />
        )}
      </MainLayout>
    </>
  );
}

export default App;

