import * as S from './BottomButtonContainer.style';

import Button from '../Button/Button';
import { ReactElement } from 'react';

interface BottomButtonContainerProps {
  children: ReactElement<typeof Button> | ReactElement<typeof Button>[];
}

export default function BottomButtonContainer(
  props: BottomButtonContainerProps
) {
  const { children } = props;

  return <div css={S.container}>{children}</div>;
}
