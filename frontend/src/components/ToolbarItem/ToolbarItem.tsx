import * as S from './ToolbarItem.style';

import { HTMLAttributes, ReactNode } from 'react';

import Button from '../Button/Button';

interface ToolbarItemProps extends HTMLAttributes<HTMLDivElement> {
  svg: ReactNode;
  description: string;
}

export default function ToolbarItem(props: ToolbarItemProps) {
  const { svg, description, ...restProps } = props;

  return (
    <div css={S.itemContainer} {...restProps}>
      <Button css={S.button} circle secondary>
        {svg}
      </Button>
      {description}
    </div>
  );
}
