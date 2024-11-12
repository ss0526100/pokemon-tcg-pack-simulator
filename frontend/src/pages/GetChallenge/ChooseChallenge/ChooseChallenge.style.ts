import { css } from '@emotion/react';

export const boxContainer = css`
  width: 100%;
  height: 50%;

  max-width: 440px;
  max-height: 440px;

  background: #ffffffa9;
  border-radius: 20px;
  padding: 10px;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 2rem;

  overflow-y: scroll;

  width: 100%;
  height: 100%;

  padding: 20px;

  scroll-behavior: smooth;
`;

export const confirmContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  max-width: 560px;
  height: 40vh;
`;

export const modalTitle = css`
  font-size: 30px;
  font-weight: 600;
  margin: 10px 0;
`;
