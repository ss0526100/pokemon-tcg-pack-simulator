import * as S from './PackOpen.styles';

import { useCallback, useEffect } from 'react';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import LeftArrowSvg from '../../../components/svgs/LeftArrowSvg';
import Rarity from '../../../components/Rarity/Rarity';
import RightArrowSvg from '../../../components/svgs/RightArrowSvg';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';
import usePacksIndex from './usePacksIndex';

interface PackOpenProps {
  packs: Pack[];
  goOpen: () => void;
  goSelect: () => void;
  nowPackType: PackType;
  isOnePack: boolean;
}

const packMapper: Record<PackType, string> = {
  charizard: '리자몽',
  pikachu: '피카츄',
  mewtwo: '뮤츠',
};

export default function PackOpen(props: PackOpenProps) {
  const { packs, goOpen, goSelect, nowPackType, isOnePack } = props;

  const {
    cardLength,
    cardIndex,
    isFirstCard,
    isLastCard,
    nowCard,
    setBeforeCard,
    setNextCard,
    countLeftCards,
    initPackIndex,
  } = usePacksIndex(packs);

  const packCount = usePackCount()[0];

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
      <div css={S.sectionContainer}>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            {!isFirstCard && <LeftArrowSvg size={30} onClick={setBeforeCard} />}
          </div>
        </div>
        <div css={S.cardContainer}>
          <Card cardInfo={nowCard} onClick={setNextCard} />
        </div>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            {!isLastCard && <RightArrowSvg size={30} onClick={setNextCard} />}
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
              packMapper[nowPackType] +
              ' ' +
              (isOnePack ? 1 : Math.floor(packCount))
            }팩)`}
          </Button>
        )}
        <Button
          css={S.buttonAnimation}
          secondary
          onClick={handleGoSelect}
          key={'selectButton'}
        >
          팩 선택하러 가기
        </Button>
      </BottomButtonContainer>
    </section>
  );
}
