import * as S from './Button.styles';

import { HTMLAttributes } from 'react';

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
}

export default function Button(props: buttonProps) {
  const { primary, secondary, children, ...restProps } = props;

  return (
    <button css={S.button({ primary, secondary })} {...restProps}>
      {children}
    </button>
  );
}
