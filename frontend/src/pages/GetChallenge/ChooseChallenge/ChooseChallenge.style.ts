import { css } from '@emotion/react';

export const boxContainer = css`
  width: 100%;
  height: 60%;

  max-width: 440px;
  max-height: 320px;

  background: rgb(244, 247, 252) 60%;
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

  background-color: red;

  &::-webkit-scrollbar {
    display: none;
  }
`;
