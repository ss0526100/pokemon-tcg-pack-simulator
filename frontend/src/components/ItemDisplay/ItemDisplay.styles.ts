import { css } from '@emotion/react';

export const container = css`
  position: relative;

  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 2%;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 20px 0 0;
`;

export const rowContainer = css`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 10px;

  width: 100%;
  height: 45%;
`;

export const firstRow = css`
  ${rowContainer};
`;

export const secondRow = css`
  ${rowContainer};
  position: absolute;
  top: 50%;
  left: 16.7%;
`;

export const childContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  aspect-ratio: 1 / 1.395;
  width: 32%;

  & > img {
    width: 100%;
    height: auto;
  }
`;
