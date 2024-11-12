import * as S from './ItemDisplay.styles';

import { PropsWithChildren } from 'react';

export default function ItemDisplay(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div css={S.container}>
      {Array.isArray(children) &&
        children.map((child, idx) => (
          <div css={S.childContainer} key={idx}>
            {child}
          </div>
        ))}
      {!Array.isArray(children) && <div css={S.childContainer}>{children}</div>}
    </div>
  );
}
