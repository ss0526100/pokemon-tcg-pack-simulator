import './App.css';

import { useCallback, useState } from 'react';

import { NORMAL_PACK_RARE_PERCENTAGE_LIST_BY_INDEX } from './constant/service';
import Pack from './components/Pack';
import getRandomStrByPercentFunc from './utils/getRandomStrByPercentFunc';

const NORMAL_PACK_RARE_RANDOM_FUNC =
  NORMAL_PACK_RARE_PERCENTAGE_LIST_BY_INDEX.map(lists =>
    getRandomStrByPercentFunc(lists)
  );

const getRandomPackRare = () =>
  NORMAL_PACK_RARE_RANDOM_FUNC.map(func => func()).sort(
    () => Math.random() - 0.5
  );

const initPackRare = getRandomPackRare();
function App() {
  const [packRare, setPackRare] = useState(initPackRare);

  const setRandomPack = useCallback(() => {
    const packRare = getRandomPackRare();
    setPackRare(packRare);
  }, []);

  return (
    <>
      <Pack cardList={packRare} onEnd={setRandomPack} key={packRare.join('')} />
    </>
  );
}

export default App;

