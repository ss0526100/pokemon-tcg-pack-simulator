import { css } from '@emotion/react';

export const container = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

export const rowContainer = css`
  height: 45%;
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
  gap: 10px;
`;
export const childContainer = css`
  display: flex;
  flex-direction: column;
  width: 33%;
  height: 80%;

  align-items: center;
  max-width: 180px;

  & > * {
    padding: 0 !important;
  }

  & > div {
    width: 100%;
    height: 100%;
  }

  & > div > div {
    width: 100%;
    height: 100%;
  }
  & > div > div > img {
    width: 100%;
    height: 100%;

    object-fit: contain;
    background-color: transparent;
  }

  & > div > div > div > img {
    width: 100%;
    height: 100%;

    object-fit: contain;
    background-color: transparent;
  }

  & > img {
    width: 100%;
    height: 100%;

    object-fit: contain;
    background-color: transparent;
  }
`;
