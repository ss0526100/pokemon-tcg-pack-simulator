import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

export const rarity = (size: number) => css`
  height: ${size}px;
`;
