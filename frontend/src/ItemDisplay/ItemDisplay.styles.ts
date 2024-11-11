import { css } from '@emotion/react';

export const container = css`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50%;
  gap: 0px; /* 각 링 사이의 간격 */
  justify-items: center;

  & > :nth-child(4) {
    grid-column: 2 / 3;
  }

  & > :nth-child(4),
  & > :nth-child(5) {
    transform: translateX(-66%);
  }
`;
export const childContainer = css`
  & > * {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`;
