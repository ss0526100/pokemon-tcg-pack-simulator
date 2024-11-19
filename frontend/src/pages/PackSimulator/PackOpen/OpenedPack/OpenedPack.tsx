import * as S from './OpenedPack.style';

import Card from '../../../../components/Card/Card';

interface OpenedPackProps {
  beforeCard: CardInfo | null;
  nowCard: CardInfo;
  nextCard: CardInfo | null;
  isEmergingNowCard: boolean;
  nowIndex: number;
  setNextCard: () => void;
}

export default function OpenedPack(props: OpenedPackProps) {
  const {
    beforeCard,
    nowCard,
    nextCard,
    isEmergingNowCard,
    nowIndex,
    setNextCard,
  } = props;

  if (isEmergingNowCard)
    return (
      <div css={S.cardCase}>
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
      </div>
    );

  return (
    <div css={S.cardCase}>
      {nextCard && (
        <div key={nowIndex + 1} css={S.cardContainer}>
          <Card cardInfo={nextCard} />
        </div>
      )}

      <div key={nowIndex} css={S.rightInCardContainer}>
        <Card cardInfo={nowCard} onClick={setNextCard} />
      </div>
    </div>
  );
}
