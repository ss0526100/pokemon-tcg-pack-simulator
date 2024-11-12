import { css } from '@emotion/react';

export const container = css`
  position: relative;
  align-items: center;

  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 10%;
`;

export const rowContainer = css`
  height: 45%;
  display: flex;
  flex-direction: row;

  gap: 10px;
`;

export const childContainer = css`
  display: flex;
  flex-direction: column;
  height: 100%;

  align-items: center;
  max-width: 180px;
`;
