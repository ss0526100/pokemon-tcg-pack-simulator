import { css } from '@emotion/react';

export const layout = css`
  padding: 3rem;
`;

export const cardContainer = css`
  display: flex;
  gap: 0.5rem;
`;
export const selectContainer = css`
  display: flex;
  height: 477px;
  align-items: center;
`;

export const svgContainer = css`
  border-radius: 100%;
  padding: 10px;
  background-color: transparent;
  &:hover {
    background-color: #0000003f;
  }
`;
