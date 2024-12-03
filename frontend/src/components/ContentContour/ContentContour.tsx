import * as S from './ContentContour.style';

import { HTMLProps } from 'react';

export default function ContentContour(props: HTMLProps<HTMLDivElement>) {
  return <div {...props} css={S.contour} />;
}
