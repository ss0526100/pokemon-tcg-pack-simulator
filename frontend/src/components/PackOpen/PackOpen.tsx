import * as S from './PackOpen.styles';

import { useCallback, useEffect, useState } from 'react';

import Button from '../Button/Button';
import Card from '../Card/Card';
import LeftArrow from '../svgs/LeftArrow';
import RightArrow from '../svgs/RightArrow';

interface PackOpenProps {
  cardInfos: CardInfo[];
  goOpen: () => void;
  goSelect: () => void;
  nowPackType: A1PackType;
}

const packMapper: Record<A1PackType, string> = {
  charizard: '리자몽',
  pikachu: '피카츄',
  mewtwo: '뮤츠',
};

export default function PackOpen(props: PackOpenProps) {
  const { cardInfos, goOpen, goSelect, nowPackType } = props;
  const [cardIndex, setCardIndex] = useState(0);

  const getBeforeCard = () => {
    setCardIndex(prev => Math.max(0, prev - 1));
  };

  const getNextCard = useCallback(() => {
    setCardIndex(prev => Math.min(prev + 1, cardInfos.length - 1));
  }, [cardInfos]);

  const reopen = useCallback(() => {
    if (cardIndex !== cardInfos.length - 1) return;
    goOpen();
    setCardIndex(0);
  }, [cardIndex, cardInfos, goOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          getBeforeCard();
          break;
        case 'ArrowRight':
          getNextCard();
          break;
        case ' ':
          getNextCard();
          if (cardIndex === cardInfos.length - 1) goSelect();
          break;
        case 'r':
          reopen();
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [cardIndex, cardInfos, getNextCard, goSelect, reopen]);

  return (
    <section css={S.layout}>
      <div css={S.cardContainer}>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <LeftArrow size={30} onClick={getBeforeCard} />
          </div>
        </div>
        <Card cardInfo={cardInfos[cardIndex]} />
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <RightArrow size={30} onClick={getNextCard} />
          </div>
        </div>
      </div>
      {`(${cardIndex + 1}/${cardInfos.length})`}
      {cardIndex === cardInfos.length - 1 && (
        <div css={S.buttonContainer}>
          <Button onClick={goSelect}>팩 선택 하러가기</Button>
          <Button secondary onClick={reopen}>
            다시 개봉하기(현재 {packMapper[nowPackType]} 팩)
          </Button>
        </div>
      )}
    </section>
  );
}
