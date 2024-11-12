import * as S from './Card.style';

import { HTMLProps, useState } from 'react';

import CARD_BACK from '../../assets/cards/CardBack.png';

interface CardProps extends HTMLProps<HTMLDivElement> {
  flipping?: boolean;
  flipped?: boolean;
  controlled?: boolean;
  onClick?: () => void;
  cardInfo: CardInfo;
}

export default function Card(props: CardProps) {
  const {
    cardInfo,
    flipped = false,
    flipping = false,
    controlled = true,
    onClick,
    ...restProps
  } = props;
  const [isFlipped, setIsFlipped] = useState(flipped);
  const handleFlip = () => {
    onClick?.();
    if (controlled) return;
    if (!flipping) return;
    setIsFlipped(!flipped);
  };
  return (
    <div css={S.flip} onClick={handleFlip} {...restProps}>
      <div css={S.card(controlled ? flipped : isFlipped)}>
        <img css={S.front} src={cardInfo.imgSrc}></img>
        <img css={S.back} src={CARD_BACK}></img>
      </div>
    </div>
  );
}
