import * as S from './Card.style';

import { HTMLProps } from 'react';
import i18n from '../../locales/i18n';

interface Pack extends HTMLProps<HTMLImageElement> {
  cardInfo: CardInfo;
}

export default function Card(props: Pack) {
  const { cardInfo, ...restProps } = props;

  const region = i18n.language as Language;
  return <img src={cardInfo.imgSrc[region]} css={S.card} {...restProps} />;
}
