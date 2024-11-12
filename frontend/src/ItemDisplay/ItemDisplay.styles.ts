import { css } from '@emotion/react';

export const container = css`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50% 50%;
  gap: 0px; /* 각 링 사이의 간격 */
  justify-items: center;

  align-items: center;

  & > :nth-of-type(4) {
    grid-column: 2 / 3;
  }

  & > :nth-of-type(4),
  & > :nth-of-type(5) {
    transform: translateX(-50%);
  }
`;
export const childContainer = css`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  object-fit: contain !important;

  // & > * {
  //   width: 100% !important;
  //   height: 100% !important;

  //   object-fit: contain !important;
  // }
`;
