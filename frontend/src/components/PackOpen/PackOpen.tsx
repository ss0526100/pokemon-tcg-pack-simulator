import * as S from './PackOpen.styles';

import Button from '../Button/Button';
import Card from '../Card/Card';
import LeftArrow from '../svgs/LeftArrow';
import RightArrow from '../svgs/RightArrow';
import { useState } from 'react';

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

  const getNextCard = () => {
    setCardIndex(prev => Math.min(prev + 1, cardInfos.length - 1));
  };

  const reopen = () => {
    goOpen();
    setCardIndex(0);
  };

  return (
    <main css={S.layout}>
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
    </main>
  );
}
