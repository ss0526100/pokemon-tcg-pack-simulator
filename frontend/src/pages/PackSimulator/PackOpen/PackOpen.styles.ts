import { css, keyframes } from '@emotion/react';

export const layout = css`
  display: flex;
  padding: 3rem 0;
  flex-direction: column;
  align-items: center;
  height: 600px;
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
  width: 50px;
  background-color: transparent;
  &:hover {
    background-color: #0000003f;
  }
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

export const rarityContainer = css`
  display: flex;
  width: 100%;
  padding: 10px 80px 0;
`;
