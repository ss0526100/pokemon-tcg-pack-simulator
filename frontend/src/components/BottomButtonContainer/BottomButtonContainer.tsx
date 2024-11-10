import * as S from './BottomButtonContainer.style';

import Button from '../Button/Button';
import { ReactElement } from 'react';

type ChildrenType = ReactElement<typeof Button> | null | boolean;
interface BottomButtonContainerProps {
  children: ChildrenType | ChildrenType[];
}

export default function BottomButtonContainer(
  props: BottomButtonContainerProps
) {
  const { children } = props;

  return <div css={S.container}>{children}</div>;
}
