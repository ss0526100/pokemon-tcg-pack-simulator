import * as S from './ToolbarItem.style';

import { Fragment, HTMLAttributes, ReactNode } from 'react';

import Button from '../Button/Button';

interface ToolbarItemProps extends HTMLAttributes<HTMLDivElement> {
  svg: ReactNode;
  description: ReactNode;
}

export default function ToolbarItem(props: ToolbarItemProps) {
  const { svg, description, ...restProps } = props;

  return (
    <div css={S.itemContainer} {...restProps}>
      <Button css={S.button} circle secondary>
        {svg}
      </Button>
      <span css={S.toolbarSpan}>
        {typeof description === 'string'
          ? description.split(' ').map(str => (
              <Fragment key={str}>
                {str}
                <br />
              </Fragment>
            ))
          : description}
      </span>
    </div>
  );
}
