import * as S from './MobileTopRightHamburger.style';

import { HTMLProps, ReactNode, SVGProps } from 'react';

import Button from '../Button/Button';
import HamburgerSvg from '../svgs/HamgurgerSvg';

export default function MobileTopRightHamburger(
  props: SVGProps<SVGSVGElement>
) {
  const { children, ...restProps } = props;
  return (
    <>
      <HamburgerSvg css={S.hamburger} fill={'black'} size={30} {...restProps} />
      <div css={S.rightBox}>{children}</div>
    </>
  );
}

interface OptionProps extends HTMLProps<HTMLDivElement> {
  svg: ReactNode;
  description: string;
}

MobileTopRightHamburger.Option = function Option(props: OptionProps) {
  const { svg, description, ...restProps } = props;

  return (
    <div css={S.optionContainer} {...restProps}>
      <Button css={S.button} circle secondary>
        {svg}
      </Button>
      <span css={S.optionSpan}>{description}</span>
    </div>
  );
};
