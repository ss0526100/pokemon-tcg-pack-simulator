import { css } from '@emotion/react';

export const content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 80vw;
  max-width: 400px;
  height: 30vh;
`;

export const recommendCountContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 10px;
`;

export const recommendButton = css`
  width: 23%;
  height: 100%;
  padding: 0;

  font-size: 15px;
  font-weight: 600;
`;
