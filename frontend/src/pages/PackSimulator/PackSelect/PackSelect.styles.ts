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
  position: relative;

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-around;

  height: 80%;

  @media (width <= 600px) {
    width: 90%;
    height: 80vh;
    padding: 40px 0 0;
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
  @media (width <= 600px) {
    padding: 20px 10px;
    font-size: 18px;
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 80%;

  animation: ${bounce} 3.5s ease-in-out infinite;

  & > img {
    aspect-ratio: 334/644;
    width: auto;
    max-width: 100vw;
    height: 100%;

    object-fit: fill;
  }

  @media (width <= 600px) {
    & > img {
      aspect-ratio: 334/644;
      width: auto;
      max-width: 100vw;
      height: 60vh;
      max-height: 999px;

      object-fit: fill;
    }
  }
`;

export const checkboxContainer = css`
  position: absolute;
  right: 0;
  bottom: -30px;
  left: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: max-content;
  margin: auto;

  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  text-align: center;
`;

export const checkbox = css`
  margin: 0 10px 0 0;
`;

export const buttonContainer = css`
  @media (width <= 600px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 20px;
  }
`;
