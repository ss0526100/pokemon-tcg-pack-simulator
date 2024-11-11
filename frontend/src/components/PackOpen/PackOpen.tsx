import * as S from './PackOpen.styles';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import BottomButtonContainer from '../BottomButtonContainer/BottomButtonContainer';
import Button from '../Button/Button';
import Card from '../Card/Card';
import LeftArrow from '../svgs/LeftArrow';
import Rarity from '../Rarity/Rarity';
import RightArrow from '../svgs/RightArrow';
import usePackUtil from '../../hooks/atoms/packs/usePackUtil';

interface PackOpenProps {
  packs: Pack[];
  goOpen: () => void;
  goSelect: () => void;
  nowPackType: PackType;
}

const packMapper: Record<PackType, string> = {
  charizard: '리자몽',
  pikachu: '피카츄',
  mewtwo: '뮤츠',
};

interface PackIndexInfo {
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

export default function PackOpen(props: PackOpenProps) {
  const { packs, goOpen, goSelect, nowPackType } = props;
  const [packIndexInfo, setPackIndexInfo] =
    useState<PackIndexInfo>(initPackIndexInfo);
  const { countCard, increasePackCount } = usePackUtil();

  const maxPackIndexInfo = useRef<PackIndexInfo>(packIndexInfo);

  const isFirstCount = useRef(false);

  const cardLength = useMemo(
    () => packs.reduce((a, pack) => a + pack.length, 0),
    [packs]
  );

  const cardIndex = getCardIndexInTotal(packIndexInfo, packs);

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
    if (isBiggerIndexInfo(nextPackInfo, maxPackIndexInfo.current)) {
      maxPackIndexInfo.current = nextPackInfo;
      const nextCard = getCardFromPacksByIndexInfo(packs, nextPackInfo);
      countCard(nextCard);
    }
  }, [countCard, packs, packIndexInfo]);

  const reopen = useCallback(() => {
    if (packIndexInfo.packIndex !== packs.length - 1) return;
    isFirstCount.current = false;
    goOpen();
    setPackIndexInfo(initPackIndexInfo);
    maxPackIndexInfo.current = initPackIndexInfo;
  }, [packs, goOpen, packIndexInfo]);

  const handleGoSelect = useCallback(() => {
    isFirstCount.current = false;
    if (!isLastIndexInfo(maxPackIndexInfo.current, packs)) {
      let nowIndexInfo = getNextIndexInfo(maxPackIndexInfo.current, packs);
      while (!isLastIndexInfo(nowIndexInfo, packs)) {
        const nowCard = getCardFromPacksByIndexInfo(packs, nowIndexInfo);

        countCard(nowCard);
        nowIndexInfo = getNextIndexInfo(nowIndexInfo, packs);
      }
      const lastCard = getCardFromPacksByIndexInfo(packs, nowIndexInfo);
      countCard(lastCard);
    }

    goSelect();
  }, [countCard, goSelect, packs]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          setBeforeCard();
          break;
        case 'ArrowRight':
          setNextCard();
          break;
        case ' ':
          setNextCard();
          if (cardIndex === cardLength) reopen();
          break;
        case 'r':
          handleGoSelect();
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    cardIndex,
    packs,
    cardLength,
    setBeforeCard,
    setNextCard,
    handleGoSelect,
    reopen,
  ]);

  useEffect(() => {
    if (isFirstCount.current) return;
    isFirstCount.current = true;
    increasePackCount(prev => prev + packs.length);
    const firstCard = packs[0][0];
    if (firstCard) countCard(firstCard);
  }, [packs, increasePackCount, countCard]);
  return (
    <section css={S.layout}>
      <div css={S.cardContainer}>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <LeftArrow size={30} onClick={setBeforeCard} />
          </div>
        </div>
        <Card cardInfo={nowCard} onClick={setNextCard} />
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <RightArrow size={30} onClick={setNextCard} />
          </div>
        </div>
      </div>
      {`(${cardIndex}/${cardLength})`}

      <div css={S.rarityContainer}>
        <Rarity rarity={nowCard.rarity} size={30} />
      </div>

      <BottomButtonContainer direction='column'>
        {isLastIndexInfo(packIndexInfo, packs) && (
          <Button css={S.buttonAnimation} primary onClick={reopen}>
            다시 개봉하기
            {`\n(${
              packMapper[nowPackType] + ' ' + Math.floor(packs.length)
            }팩)`}
          </Button>
        )}
        <Button
          css={S.buttonAnimation}
          secondary
          onClick={goSelect}
          key={'selectButton'}
        >
          팩 선택하러 가기
        </Button>
      </BottomButtonContainer>
    </section>
  );
}
