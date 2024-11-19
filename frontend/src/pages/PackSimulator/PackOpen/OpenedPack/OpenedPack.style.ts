import { css, keyframes } from '@emotion/react';

const goRight = keyframes`
  0%{
    transform:translateX(0%)
  }

  100%{
    transform:translateX(100vw);
  }
`;

const comeFromRight = keyframes`
  0%{
    transform:translateX(100vw)
  }

  100%{
    transform:translateX(0vw);
  }
`;
export const cardCase = css`
  position: relative;
  aspect-ratio: 1 / 1.395;
  height: 100%;
`;

export const cardContainer = css`
  position: absolute;
  top: 0;
  left: 0;

  height: 33vh;
  max-height: 335px;

  @media (width<=600px) {
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

export const rightInCardContainer = css`
  ${cardContainer}
  animation: ${comeFromRight} 100ms linear normal forwards;
`;

export const rightOutCardContainer = css`
  ${cardContainer}
  animation:${goRight} 100ms ease-in normal forwards;
`;
