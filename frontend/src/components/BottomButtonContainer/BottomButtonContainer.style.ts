import { css } from '@emotion/react';

export const container = (direction: 'column' | 'row') => css`
  display: flex;
  flex-direction: ${direction};
  gap: 1rem;

  width: 100%;
  padding: 2rem 0;
`;
