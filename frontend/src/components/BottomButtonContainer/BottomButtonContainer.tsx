import * as S from './BottomButtonContainer.style';

import Button from '../Button/Button';
import { ReactElement } from 'react';

type ChildrenType = ReactElement<typeof Button> | null | boolean;
interface BottomButtonContainerProps {
  children: ChildrenType | ChildrenType[];
  direction?: 'column' | 'row';
}

export default function BottomButtonContainer(
  props: BottomButtonContainerProps
) {
  const { direction = 'column', children } = props;

  return <div css={S.container(direction)}>{children}</div>;
}
