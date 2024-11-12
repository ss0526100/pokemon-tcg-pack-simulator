import * as S from './ItemDisplay.styles';

import { PropsWithChildren, cloneElement } from 'react';

export default function ItemDisplay(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div css={S.container}>
      {Array.isArray(children) &&
        children.map((child, idx) =>
          cloneElement(child, { key: idx, css: S.childContainer })
        )}
      {!Array.isArray(children) && <div css={S.childContainer}>{children}</div>}
    </div>
  );
}
