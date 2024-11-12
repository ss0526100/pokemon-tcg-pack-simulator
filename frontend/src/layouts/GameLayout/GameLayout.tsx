import * as S from './GameLayout.styles';

import { PropsWithChildren } from 'react';

function GameLayout(props: PropsWithChildren) {
  const { children } = props;
  return <main css={S.layout}>{children}</main>;
}

GameLayout.Content = function ContentLayout(props: PropsWithChildren) {
  return <section css={S.content}>{props.children}</section>;
};

interface ToolbarProps extends PropsWithChildren {
  leftFirst?: boolean;
  rightFirst?: boolean;
}

function ToolbarLayout(props: ToolbarProps) {
  const { leftFirst, rightFirst, children } = props;

  const childrenLength = Array.isArray(children)
    ? children.length
    : +(children || 0);
  return (
    <section
      css={S.toolbarContainer({
        leftFirst,
        rightFirst,
        childrenLength: childrenLength,
      })}
    >
      {children}
    </section>
  );
}

ToolbarLayout.ToolbarItemContainer = function LeftToolbar(
  props: PropsWithChildren
) {
  return <section css={S.toolbarLeft}>{props.children}</section>;
};

GameLayout.Toolbar = ToolbarLayout;

GameLayout.Description = function Description(props: PropsWithChildren) {
  return <section css={S.description}>{props.children}</section>;
};

export default GameLayout;
