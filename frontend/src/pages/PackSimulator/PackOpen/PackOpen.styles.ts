import { css, keyframes } from '@emotion/react';

export const layout = css`
  transform: translateY(-40px);

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 600px;
  padding: 3rem 0;

  @media (width <= 600px) {
    transform: translateY(0);
    width: 100%;
    height: 100%;
    padding: 0;
  }
`;

export const sectionContainer = css`
  display: flex;
  gap: 0.5rem;
  margin: 0 0 50px;

  @media (width<=600px) {
    align-items: center;
    width: 100%;
    height: 100vh;
    margin: 0;
  }
`;
export const selectContainer = (isViewed: boolean) => css`
  ${isViewed ? '' : 'opacity:0;'}
  display: flex;
  align-items: center;
  width: 50px;
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
  width: 50px;
  padding: 10px;
  background-color: transparent;
  border-radius: 100%;
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
  position: absolute;
  bottom: -60px;
  left: 20px;
  display: flex;
`;

export const cardInfoContainer = css`
  position: relative;

  @media (width<=600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    width: 70%;
  }
`;
export const cardContainer = css`
  position: relative;
  height: 33vh;
  max-height: 335px;

  @media (width<=600px) {
    transform: translateY(-25px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    width: 70vw;
    height: auto;
    max-height: none;

    & > * {
      width: 100%;
      height: auto;
    }
  }
`;

export const bottomContainer = css`
  @media (width<=600px) {
    position: fixed;
    bottom: 0;
    display: none;
    padding: 2rem;
  }
`;

export const mobileBottomFixed = css`
  display: none;

  @media (width<=600px) {
    position: fixed;
    bottom: 0;
    display: block;
    padding: 2rem;
  }
`;
