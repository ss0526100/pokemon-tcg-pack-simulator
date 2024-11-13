import { css, keyframes } from '@emotion/react';

import COLOR from '../../../constant/colors';

export const displaySection = css`
  width: 100%;
  height: 320px;
`;

const focusIn = keyframes` 0% {
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      filter: blur(0px);
      opacity: 1;
    }`;

export const buttonAnimation = css`
  animation: ${focusIn} 200ms cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
`;
export const cardContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const cardTag = css`
  position: absolute;
  z-index: 10;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 60px !important;
  height: 25px !important;

  font-size: 17px;
  font-weight: 700;
  color: white;

  background-color: red;
  background-color: ${COLOR.PRIMARY_COLOR};
  border-radius: 20px;
`;
