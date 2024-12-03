import * as S from './FlippingCard.style';

import { HTMLProps, useState } from 'react';

import CARD_BACK from '@_assets/cards/CardBack.png';
import Card from '@_components/Card/Card';

interface FlippingCard extends HTMLProps<HTMLDivElement> {
  flipped?: boolean;
  controlled?: boolean;
  onClick?: () => void;
  imageSet: LanguageSet<string>;
}

export default function FlippingCard(props: FlippingCard) {
  const {
    imageSet,
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
        <Card css={S.front} cardImageSet={imageSet} />
        <Card css={S.back} cardImageSet={CARD_BACK} />
      </div>
    </div>
  );
}
