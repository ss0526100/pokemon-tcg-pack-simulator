import * as S from './PackOpen.styles';

import { useCallback, useEffect } from 'react';

import BottomButtonContainer from '../BottomButtonContainer/BottomButtonContainer';
import Button from '../Button/Button';
import Card from '../Card/Card';
import LeftArrow from '../svgs/LeftArrow';
import Rarity from '../Rarity/Rarity';
import RightArrow from '../svgs/RightArrow';
import usePacksIndex from './usePacksIndex';

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

export default function PackOpen(props: PackOpenProps) {
  const { packs, goOpen, goSelect, nowPackType } = props;

  const {
    cardLength,
    cardIndex,
    isLastCard,
    nowCard,
    setBeforeCard,
    setNextCard,
    countLeftCards,
    initPackIndex,
  } = usePacksIndex(packs);

  const reopen = useCallback(() => {
    if (!isLastCard) return;
    countLeftCards();
    initPackIndex();
    goOpen();
  }, [isLastCard, countLeftCards, initPackIndex, goOpen]);

  const handleGoSelect = useCallback(() => {
    countLeftCards();
    initPackIndex();
    goSelect();
  }, [countLeftCards, initPackIndex, goSelect]);

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
        {isLastCard && (
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
