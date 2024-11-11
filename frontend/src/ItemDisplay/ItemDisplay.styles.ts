import { css } from '@emotion/react';

export const container = css`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50%;
  gap: 0px; /* 각 링 사이의 간격 */
  justify-items: center;

  align-items: center;

  & > :nth-child(4) {
    grid-column: 2 / 3;
  }

  & > :nth-child(4),
  & > :nth-child(5) {
    transform: translateX(-50%);
  }
`;
export const childContainer = css`
  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 0 10px;
  & > * {
    width: 70% !important;
    height: 70% !important;
  }
`;
