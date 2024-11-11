import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import usePackUtil from '../../hooks/atoms/packs/usePackUtil';

export interface PackIndexInfo {
  packIndex: number;
  cardIndex: number;
}

const initPackIndexInfo: PackIndexInfo = {
  packIndex: 0,
  cardIndex: 0,
};

const getNextIndexInfo = (packIndexInfo: PackIndexInfo, packs: Pack[]) => {
  if (isLastIndexInfo(packIndexInfo, packs)) return { ...packIndexInfo };
  const { packIndex, cardIndex } = packIndexInfo;
  if (cardIndex === packs[packIndex].length - 1) {
    const nextPackIndex = Math.min(packIndex + 1, packs.length - 1);
    return {
      packIndex: nextPackIndex,
      cardIndex: 0,
    };
  }
  return {
    ...packIndexInfo,
    cardIndex: packIndexInfo.cardIndex + 1,
  };
};

const isBiggerIndexInfo = (
  checkIndexInfo: PackIndexInfo,
  targetIndexInfo: PackIndexInfo
) => {
  if (checkIndexInfo.packIndex > targetIndexInfo.packIndex) return true;
  if (checkIndexInfo.packIndex === targetIndexInfo.packIndex)
    return checkIndexInfo.cardIndex > targetIndexInfo.cardIndex;
  return false;
};

const getCardFromPacksByIndexInfo = (
  packs: Pack[],
  indexInfo: PackIndexInfo
) => {
  const { packIndex, cardIndex } = indexInfo;
  return packs[packIndex][cardIndex];
};

const getCardIndexInTotal = (packIndexInfo: PackIndexInfo, packs: Pack[]) => {
  let result = 0;
  for (
    let nowPackIndex = 0;
    nowPackIndex < packIndexInfo.packIndex;
    nowPackIndex++
  ) {
    result += packs[nowPackIndex].length;
  }
  result += packIndexInfo.cardIndex + 1;

  return result;
};

const isLastIndexInfo = (packIndexInfo: PackIndexInfo, packs: Pack[]) => {
  if (packs.length - 1 > packIndexInfo.packIndex) return false;
  if (packs.length - 1 < packIndexInfo.packIndex) return true;
  const lastPack = packs.at(-1);
  if (!lastPack) return true;
  return lastPack.length - 1 === packIndexInfo.cardIndex;
};

export default function usePacksIndex(packs: Pack[]) {
  const [packIndexInfo, setPackIndexInfo] =
    useState<PackIndexInfo>(initPackIndexInfo);
  const { countCard, increasePackCount } = usePackUtil();

  const [maxPackIndexInfo, setMaxPackIndexInfo] =
    useState<PackIndexInfo>(packIndexInfo);

  const isFirstCount = useRef(false);

  const cardLength = useMemo(
    () => packs.reduce((a, pack) => a + pack.length, 0),
    [packs]
  );

  const cardIndex = getCardIndexInTotal(packIndexInfo, packs);

  const isFirstCard = cardIndex === 1;
  const isLastCard = cardIndex === cardLength;

  const nowCard = getCardFromPacksByIndexInfo(packs, packIndexInfo);

  const setBeforeCard = useCallback(() => {
    setPackIndexInfo(prevInfo => {
      if (prevInfo.cardIndex === 0 && prevInfo.packIndex === 0)
        return { ...prevInfo };
      if (prevInfo.cardIndex === 0) {
        const nextPackIndex = Math.max(0, prevInfo.packIndex - 1);
        return {
          packIndex: nextPackIndex,
          cardIndex: packs[nextPackIndex].length - 1,
        };
      }
      return {
        ...prevInfo,
        cardIndex: prevInfo.cardIndex - 1,
      };
    });
  }, [packs]);

  const setNextCard = useCallback(() => {
    let nextPackInfo = getNextIndexInfo(packIndexInfo, packs);
    setPackIndexInfo(prevInfo => {
      nextPackInfo = getNextIndexInfo(prevInfo, packs);

      return nextPackInfo;
    });
    // 리액트 set 단계에서 전역 상태를 수정하기 위한 코드
    if (isBiggerIndexInfo(nextPackInfo, maxPackIndexInfo)) {
      setMaxPackIndexInfo(nextPackInfo);
      const nextCard = getCardFromPacksByIndexInfo(packs, nextPackInfo);
      countCard(nextCard);
    }
  }, [countCard, packs, packIndexInfo, maxPackIndexInfo]);

  const countLeftCards = useCallback(() => {
    if (!isLastIndexInfo(maxPackIndexInfo, packs)) {
      let nowIndexInfo = getNextIndexInfo(maxPackIndexInfo, packs);
      while (!isLastIndexInfo(nowIndexInfo, packs)) {
        const nowCard = getCardFromPacksByIndexInfo(packs, nowIndexInfo);

        countCard(nowCard);
        nowIndexInfo = getNextIndexInfo(nowIndexInfo, packs);
      }
      const lastCard = getCardFromPacksByIndexInfo(packs, nowIndexInfo);
      countCard(lastCard);
    }
  }, [countCard, packs, maxPackIndexInfo]);

  const initPackIndex = useCallback(() => {
    isFirstCount.current = false;
    setMaxPackIndexInfo(initPackIndexInfo);
    setPackIndexInfo(initPackIndexInfo);
  }, []);

  useEffect(() => {
    if (isFirstCount.current) return;
    isFirstCount.current = true;
    increasePackCount(prev => prev + packs.length);

    const firstCard = packs[0][0];
    if (firstCard) countCard(firstCard);
  }, [packs, increasePackCount, countCard]);

  return {
    cardLength,
    cardIndex,
    isFirstCard,
    isLastCard,
    nowCard,
    setBeforeCard,
    setNextCard,
    countLeftCards,
    initPackIndex,
  };
}
