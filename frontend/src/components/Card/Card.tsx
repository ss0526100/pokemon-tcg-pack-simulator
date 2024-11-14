import * as S from './Card.style';

import { HTMLProps } from 'react';
import LANGUAGES from '../../constant/language';
import i18n from '../../locales/i18n';

interface Pack extends HTMLProps<HTMLImageElement> {
  cardInfo: CardInfo;
}

export default function Card(props: Pack) {
  const { cardInfo, ...restProps } = props;

  const region =
    LANGUAGES.find(language => language === i18n.language) || 'default';
  return <img src={cardInfo.imgSrc[region]} css={S.card} {...restProps} />;
}
