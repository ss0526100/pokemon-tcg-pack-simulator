import * as S from './MobileTopRightHamburger.style';

import {
  HTMLProps,
  PropsWithChildren,
  ReactNode,
  SVGProps,
  useEffect,
  useState,
} from 'react';

import Button from '@_components/Button/Button';
import HamburgerSvg from '@_components/svgs/HamgurgerSvg';

export default function MobileTopRightHamburger(
  props: SVGProps<SVGSVGElement>
) {
  const { children, ...restProps } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const html = document.getElementsByTagName('html')[0] as HTMLElement;
    const beforeSetting = html.style.overflow;

    html.style.overflow = 'hidden';

    return () => {
      html.style.overflow = beforeSetting;
    };
  }, [isMenuOpen]);
  return (
    <>
      <HamburgerSvg
        css={S.hamburger}
        fill={'black'}
        size={30}
        {...restProps}
        onClick={() => setIsMenuOpen(true)}
      />

      {isMenuOpen && (
        <>
          <div css={S.dimmer} onClick={() => setIsMenuOpen(false)} />

          <div css={S.rightBox}>
            <div onClick={() => setIsMenuOpen(false)}>{children}</div>
          </div>
        </>
      )}
    </>
  );
}

interface OptionProps extends HTMLProps<HTMLDivElement> {
  icon: ReactNode;
  description: string;
}

MobileTopRightHamburger.Option = function Option(props: OptionProps) {
  const { icon, description, ...restProps } = props;

  return (
    <>
      <div css={S.optionContainer} {...restProps}>
        <Button css={S.button} circle secondary>
          {icon}
        </Button>
        <span css={S.optionSpan}>{description}</span>
      </div>
    </>
  );
};

MobileTopRightHamburger.Line = function Line() {
  return <div css={S.line} />;
};

MobileTopRightHamburger.OptionPlace = function OptionPlace({
  children,
}: PropsWithChildren) {
  return <>{children}</>;
};
