import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;
export const title = css`
  display: flex;

  width: 30vw;
  height: 10vw;

  max-width: 200px;
  max-height: 40px;
  font-size: 1.5rem;

  align-items: center;
  justify-content: space-evenly;
  background-color: #e2e8f2;
  border-radius: 20px;
  font-weight: 800;
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2),
    inset 0px -1px 3px rgba(255, 255, 255, 0.5);
`;

export const span = css`
  width: 30vw;
  max-width: 400px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;
