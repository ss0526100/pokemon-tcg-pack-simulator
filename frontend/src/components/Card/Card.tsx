import * as S from './Card.style';

import { HTMLProps } from 'react';

interface Pack extends HTMLProps<HTMLImageElement> {
  cardInfo: CardInfo;
}

export default function Card(props: Pack) {
  const { cardInfo, ...restProps } = props;

  return <img src={cardInfo.imgSrc} css={S.card} {...restProps} />;
}
