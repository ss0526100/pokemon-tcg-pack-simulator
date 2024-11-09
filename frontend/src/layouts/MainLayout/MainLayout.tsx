import * as S from './MainLayout.style';

import { PropsWithChildren } from 'react';

export default function MainLayout(props: PropsWithChildren) {
  const { children } = props;

  return <section css={S.layout}>{children}</section>;
}
