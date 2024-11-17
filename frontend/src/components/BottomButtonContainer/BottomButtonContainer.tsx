import * as S from './BottomButtonContainer.style';

import { HTMLAttributes, ReactElement } from 'react';

import Button from '../Button/Button';

type ChildrenType = ReactElement<typeof Button> | null | boolean;
interface BottomButtonContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ChildrenType | ChildrenType[];
  direction?: 'column' | 'row';
}

export default function BottomButtonContainer(
  props: BottomButtonContainerProps
) {
  const { direction = 'column', children, ...restProps } = props;

  return (
    <div css={S.container(direction)} {...restProps}>
      {children}
    </div>
  );
}
