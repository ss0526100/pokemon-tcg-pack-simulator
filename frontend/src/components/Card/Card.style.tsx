import { css } from '@emotion/react';

export const flip = css`
  width: 219px;
  height: 335px;
  perspective: 1100px;
  object-fit: fill;
`;

export const card = (isFlipped: boolean) => css`
  width: 100%;
  height: 100%;
  position: static;
  transition: 0.4s;
  transform-style: preserve-3d;
  ${isFlipped ? 'transform: rotateY(180deg);' : ''}
`;

export const frontBackCommon = css`
  position: fixed;
  backface-visibility: hidden;
  width: 219px;
  height: 335px;

  object-fit: fill;
`;

export const front = css`
  ${frontBackCommon}
`;

export const back = css`
  ${frontBackCommon}
  transform: rotateY(180deg);
  pointer-events: none;
`;
