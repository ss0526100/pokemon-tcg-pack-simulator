import { css } from '@emotion/react';

export const card = css`
  transform: translateZ(0); /* iOS의 렌더링 오류 방지 */
  aspect-ratio: 1 / 1.395;
  height: 100%;
  background-size: cover;
`;
