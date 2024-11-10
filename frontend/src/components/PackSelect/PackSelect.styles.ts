import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  padding: 3rem 0 0;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const cardContainer = css`
  display: flex;
  gap: 0.5rem;
`;
export const selectContainer = css`
  display: flex;
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

export const button = css`
  font-size: clamp(10px, 4.5vw, 20px);
`;
