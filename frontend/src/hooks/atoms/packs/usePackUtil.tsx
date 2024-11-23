import increaseCntMap from '../../../utils/increaseMap';
import { useCallback } from 'react';
import useCardCount from './useCardCount';
import useCardIdCntMap from './useCardCollections';
import useOpenedPackCount from './useOpenedPackCount';
import useRarityCntMap from './useRarityCntMap';
import useRaritySetUtil from './useRaritySetUtil';

export default function usePackUtil() {
  const setOpenedPackCount = useOpenedPackCount()[1];
  const setGottenCardCount = useCardCount()[1];
  const setRarityCntMap = useRarityCntMap()[1];
  const setCardIdCntMap = useCardIdCntMap()[1];
  const { countRarityId, resetSets } = useRaritySetUtil();

  const countCard = useCallback(
    (...cardInfos: CardInfo[]) => {
      setGottenCardCount(prev => prev + 1);
      setRarityCntMap(prevMap => {
        const nextMap = new Map([...prevMap]);
        cardInfos.forEach(cardInfo => increaseCntMap(nextMap, cardInfo.rarity));
        return nextMap;
      });
      setCardIdCntMap(prevMap => {
        const nextMap = new Map([...prevMap]);
        cardInfos.forEach(cardInfo => increaseCntMap(nextMap, cardInfo.id));
        return nextMap;
      });
      cardInfos.forEach(card => countRarityId(card));
    },
    [setGottenCardCount, setRarityCntMap, setCardIdCntMap, countRarityId]
  );

  const increasePackCount = useCallback(
    (addCnt: number | ((number: number) => number) = 1) => {
      if (typeof addCnt === 'function') return setOpenedPackCount(addCnt);
      setOpenedPackCount(prev => prev + Math.max(Math.round(addCnt), 1));
    },
    [setOpenedPackCount]
  );

  const resetPack = useCallback(() => {
    setOpenedPackCount(0);
    setGottenCardCount(0);
    setRarityCntMap(new Map());
    resetSets();
    setCardIdCntMap(new Map());
  }, [
    setOpenedPackCount,
    setGottenCardCount,
    setRarityCntMap,
    resetSets,
    setCardIdCntMap,
  ]);

  return { countCard, increasePackCount, resetPack };
}
