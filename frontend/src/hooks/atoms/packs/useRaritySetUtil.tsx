import { useCrownIdSet, useRarityIdSet, useStarIdSet } from './useRaritySet';

import { useCallback } from 'react';

export default function useRaritySetUtil() {
  const [, setRarityIdSet] = useRarityIdSet();
  const [, setStarIdSet] = useStarIdSet();
  const [, setCrownIdSet] = useCrownIdSet();

  const countRarityId = useCallback(
    (cardInfo: CardInfo) => {
      const firstChar = cardInfo.rarity[0];
      if (firstChar === 'r')
        setRarityIdSet(prev => new Set(prev).add(cardInfo.id));
      if (firstChar === 's')
        setStarIdSet(prev => new Set(prev).add(cardInfo.id));
      if (firstChar === 'c')
        setCrownIdSet(prev => new Set(prev).add(cardInfo.id));
    },
    [setRarityIdSet, setStarIdSet, setCrownIdSet]
  );

  const resetSets = () => {
    setRarityIdSet(new Set());
    setStarIdSet(new Set());
    setCrownIdSet(new Set());
  };

  return { countRarityId, resetSets };
}
