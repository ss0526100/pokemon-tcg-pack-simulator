import { css, keyframes } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  height: 600px;
  padding: 3rem 0 0;

  @media (width <= 600px) {
    padding: 0;
  }
`;

export const contentContainer = css`
  display: flex;
  gap: 0.5rem;

  @media (width <= 600px) {
    align-items: center;
    width: 100%;
    height: 90vh;
  }
`;

export const selectContainer = css`
  display: flex;
  align-items: center;
  border-radius: 40px;

  &:active {
    background-color: #0000003f;
  }

  @media (width <= 600px) {
    z-index: 1;
    height: 80%;
  }
`;

export const svgContainer = css`
  padding: 10px;
  background-color: transparent;
  border-radius: 100%;
`;

export const button = css`
  font-size: 15px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
`;
export const packContainer = css`
  width: 70%;
  animation: ${bounce} 3.5s ease-in-out infinite;

  @media (width <= 600px) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img {
      aspect-ratio: 334/644;
      width: 70vw;
      max-width: 600px;
      height: auto;
      max-height: 999px;

      object-fit: fill;
    }
  }
`;

export const buttonContainer = css`
  @media (width <= 600px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 20px;
  }
`;
