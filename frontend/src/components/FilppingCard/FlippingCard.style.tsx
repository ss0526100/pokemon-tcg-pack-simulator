import { css } from '@emotion/react';

export const flip = css`
  height: 100%;
  perspective: 1100px;
`;

export const card = (isFlipped: boolean) => css`
  height: 100%;

  aspect-ratio: 1 / 1.395;
  transition: 0.4s;
  transform-style: preserve-3d;
  transform-origin: center; // 추가
  ${isFlipped ? 'transform: rotateY(180deg);' : ''}
`;

export const frontBackCommon = css`
  position: fixed;
  backface-visibility: hidden;
`;

export const front = css`
  ${frontBackCommon}
`;

export const back = css`
  ${frontBackCommon}
  transform: rotateY(180deg);
  pointer-events: none;
`;
