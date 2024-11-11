import { css } from '@emotion/react';

export const title = css`
  display: inline-block;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  line-height: 130%;
  text-align: center;
  padding: 0 0 1rem;
`;
export const itemContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const button = css`
  font-size: clamp(10px, 3.5vw, 20px);
  width: 30vw;
  max-width: 250px;
  height: 50px;
  padding: 10px;
`;

export const buttonContainer = css`
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  padding: 2rem 1rem 0;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
