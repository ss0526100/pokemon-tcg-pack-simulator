import * as S from './Card.style';

import { HTMLProps } from 'react';
import LANGUAGES from '@_constant/language';
import i18n from '@_locales/i18n';

interface Pack extends HTMLProps<HTMLImageElement> {
  cardImageSet: LanguageSet<string> | string;
}

export default function Card(props: Pack) {
  const { cardImageSet, ...restProps } = props;

  const region =
    LANGUAGES.find(language => language === i18n.language) || 'default';

  const imgSrc =
    typeof cardImageSet === 'string' ? cardImageSet : cardImageSet[region];

  return <img src={imgSrc} css={S.card} {...restProps} />;
}
