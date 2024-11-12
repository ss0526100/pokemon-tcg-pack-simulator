import * as S from './FlippingCard.style';

import { HTMLProps, useState } from 'react';

import CARD_BACK from '../../assets/cards/CardBack.png';
import Card from '../Card/Card';

interface FlippingCard extends HTMLProps<HTMLDivElement> {
  flipped?: boolean;
  controlled?: boolean;
  onClick?: () => void;
  cardInfo: CardInfo;
}

export default function FlippingCard(props: FlippingCard) {
  const {
    cardInfo,
    flipped = false,
    controlled = true,
    onClick,
    ...restProps
  } = props;
  const [isFlipped, setIsFlipped] = useState(flipped);
  const handleFlip = () => {
    onClick?.();
    if (controlled) return;
    setIsFlipped(!flipped);
  };

  return (
    <div css={S.flip} onClick={handleFlip} {...restProps}>
      <div css={S.card(controlled ? flipped : isFlipped)}>
        <Card css={S.front} cardInfo={cardInfo} />
        <Card
          css={S.back}
          cardInfo={{
            id: '',
            cardName: 'back',
            imgSrc: CARD_BACK,
            rarity: 's3',
            expansion: 'A1',
            category: 'normal',
          }}
        />
      </div>
    </div>
  );
}
