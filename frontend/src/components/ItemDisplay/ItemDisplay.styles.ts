import { css } from '@emotion/react';

export const container = css`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10%;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const rowContainer = css`
  position: absolute;

  display: flex;
  flex-direction: row;
  gap: 10px;

  height: 45%;
`;

export const firstRow = css`
  ${rowContainer};
`;

export const secondRow = css`
  ${rowContainer};
  top: 50%;
`;

export const childContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 180px;
  height: 100%;
`;
