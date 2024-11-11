import increaseCntMap from '../../../utils/increaseMap';
import { useCallback } from 'react';
import useCardCount from './useCardCount';
import usePackCount from './usePackCount';
import useRarityCntMap from './useRarityCntMap';

export default function usePackUtil() {
  const setPackCount = usePackCount()[1];
  const setCardCount = useCardCount()[1];
  const setRarityCntMap = useRarityCntMap()[1];

  const countCard = useCallback(
    (...cardInfos: CardInfo[]) => {
      setCardCount(prev => prev + 1);
      setRarityCntMap(prevMap => {
        const nextMap = new Map([...prevMap]);
        cardInfos.forEach(cardInfo => increaseCntMap(nextMap, cardInfo.rarity));
        return nextMap;
      });
    },
    [setCardCount, setRarityCntMap]
  );

  const increasePackCount = useCallback(
    (addCnt: number | ((number: number) => number) = 1) => {
      if (typeof addCnt === 'function') return setPackCount(addCnt);
      setPackCount(prev => prev + Math.max(Math.round(addCnt), 1));
    },
    [setPackCount]
  );

  const resetPack = useCallback(() => {
    setPackCount(0);
    setCardCount(0);
    setRarityCntMap(new Map());
  }, [setPackCount, setCardCount, setRarityCntMap]);

  return { countCard, increasePackCount, resetPack };
}
