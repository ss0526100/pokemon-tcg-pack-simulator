import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  padding: 2rem;

  @media (width <= 600px) {
    display: none;
  }
`;

export const span = css`
  font-size: 15px;
  line-height: 120%;
  text-align: center;
`;
