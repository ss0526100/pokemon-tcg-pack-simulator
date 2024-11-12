import { css, keyframes } from '@emotion/react';

export const displaySection = css`
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
`;
export const cardTag = css`
  position: absolute;
  top: 143px;
  left: 21px;
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
