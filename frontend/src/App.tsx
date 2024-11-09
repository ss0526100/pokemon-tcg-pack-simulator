import { useCallback, useState } from 'react';

import { Global } from '@emotion/react';
import MainLayout from './layouts/MainLayout/MainLayout';
import PackSelect from './components/PackSelect/PackSelect';
import getRandomPack from './utils/getRandomPack';
import reset from './reset.style';

const initPack = getRandomPack();

function App() {
  const [cardPack, setCardPack] = useState<CardInfo[]>(initPack);
  const setRandomPack = useCallback((packType: A1PackType) => {
    const randomPack = getRandomPack(packType);
    setCardPack(randomPack);
  }, []);

  return (
    <>
      <Global styles={reset} />
      <MainLayout>
        {cardPack.map(c => c.cardName).join(' ')}
        <PackSelect onSelect={setRandomPack} />
      </MainLayout>
    </>
  );
}

export default App;

