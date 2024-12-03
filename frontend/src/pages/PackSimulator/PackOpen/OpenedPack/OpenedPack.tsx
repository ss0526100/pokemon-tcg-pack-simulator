import * as S from './OpenedPack.style';

import Card from '@_components/Card/Card';
import SwipeXDetector from '@_components/SwipeXDetector/SwipeXDetector';

interface OpenedPackProps {
  beforeCard: CardInfo | null;
  nowCard: CardInfo;
  nextCard: CardInfo | null;
  isEmergingNowCard: boolean;
  nowIndex: number;
  setNextCard: () => void;
  setBeforeCard: () => void;
}

export default function OpenedPack(props: OpenedPackProps) {
  const {
    beforeCard,
    nowCard,
    nextCard,
    isEmergingNowCard,
    nowIndex,
    setNextCard,
    setBeforeCard,
  } = props;

  if (isEmergingNowCard)
    return (
      <SwipeXDetector
        direction='both'
        onLeftDetect={setBeforeCard}
        onRightDetect={setNextCard}
        css={S.cardCase}
      >
        {nextCard && (
          <div key={nowIndex + 1} css={S.cardContainer}>
            <Card cardInfo={nextCard} />
          </div>
        )}

        <div key={nowIndex} css={S.cardContainer}>
          <Card cardInfo={nowCard} onClick={setNextCard} />
        </div>
        {beforeCard && (
          <div key={nowIndex - 1} css={S.rightOutCardContainer}>
            <Card cardInfo={beforeCard} />
          </div>
        )}
      </SwipeXDetector>
    );

  return (
    <SwipeXDetector
      direction='both'
      onLeftDetect={setBeforeCard}
      onRightDetect={setNextCard}
      css={S.cardCase}
    >
      {nextCard && (
        <div key={nowIndex + 1} css={S.cardContainer}>
          <Card cardInfo={nextCard} />
        </div>
      )}

      <div key={nowIndex} css={S.rightInCardContainer}>
        <Card cardInfo={nowCard} onClick={setNextCard} />
      </div>
    </SwipeXDetector>
  );
}
