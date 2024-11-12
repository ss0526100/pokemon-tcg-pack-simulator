import { css, keyframes } from '@emotion/react';

export const displaySection = css`
  width: 100%;
  height: 360px;
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
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px !important;
  height: 25px !important;
  background-color: red;
  z-index: 10;
  border-radius: 20px;
  background-color: #3de086;
  color: white;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
