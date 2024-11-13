import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  border: solid 1px #00000023;
  border-radius: 20px;
`;
export const title = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 30vw;
  max-width: 150px;
  height: 10vw;
  max-height: 40px;

  font-size: 1.5rem;
  font-weight: 800;

  background-color: #e2e8f2;
  border-radius: 20px;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 20%),
    inset 0 -1px 3px rgb(255 255 255 / 50%);
`;

export const span = css`
  width: 30vw;
  max-width: 350px;

  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;
