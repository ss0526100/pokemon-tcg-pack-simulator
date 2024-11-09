import {
  A1_CARD_ID_MAP,
  A1_CARD_POOL_ID_LIST,
  MISSING_NO_CARD,
} from './constant/card';
import { useCallback, useState } from 'react';

import { Global } from '@emotion/react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { NORMAL_PACK_RARE_PERCENTAGE_LIST_BY_INDEX } from './constant/service';
import PackSelect from './components/PackSelect';
import getRandomElement from './utils/getRandomElement';
import getRandomStrByPercentFunc from './utils/getRandomStrByPercentFunc';
import reset from './reset.style';

const NORMAL_PACK_RARE_RANDOM_FUNC =
  NORMAL_PACK_RARE_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRare = () =>
  NORMAL_PACK_RARE_RANDOM_FUNC.map(func => func());

const getRandomPack = (type: A1PackType = 'charizard') => {
  const cardPoolById = A1_CARD_POOL_ID_LIST[type];
  const map = A1_CARD_ID_MAP;

  const randomPackRare = getRandomPackRare();

  const randomPack = randomPackRare
    .map((rare, idx) => {
      const randomCardIds = cardPoolById[idx][rare];
      const randomId = getRandomElement(randomCardIds);
      if (randomId === undefined) return MISSING_NO_CARD;
      return map.get(randomId) || MISSING_NO_CARD;
    })
    .sort(() => Math.random() - 0.5);
  return randomPack;
};

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

