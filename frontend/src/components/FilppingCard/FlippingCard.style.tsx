import { css } from '@emotion/react';

export const flip = css`
  height: 100%;

  perspective: 1100px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const card = (isFlipped: boolean) => css`
  transform-style: preserve-3d;

  aspect-ratio: 1 / 1.395;

  transform-origin: center;

  height: 100%;

  transition: 0.4s;

  ${isFlipped ? 'transform: rotateY(180deg);' : ''}
`;

export const frontBackCommon = css`
  position: absolute;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
`;

export const front = css`
  ${frontBackCommon}
`;

export const back = css`
  ${frontBackCommon}
  pointer-events: none;
  transform: rotateY(180deg);
`;
