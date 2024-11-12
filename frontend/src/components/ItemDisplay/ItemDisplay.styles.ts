import { css } from '@emotion/react';

export const container = css`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50% 50%;
  gap: 20px; /* 각 링 사이의 간격 */
  justify-items: center;

  align-items: center;

  & > :nth-of-type(4) {
    grid-column: 2 / 3;
  }

  & > :nth-of-type(4),
  & > :nth-of-type(5) {
    transform: translate(calc(-50% - 10px), -20px);
  }
`;
export const childContainer = css`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: calc(min(30vw, 100px));
  max-width: 180px;

  height: calc(min(30vw, 100px) * 1.4);
  height: calc(180px * 1.4)
  padding: 1rem;

  & > div {
    width: 100%;
    height: 100%;
  }

  & > div > div {
    width: 100%;
    height: 100%;
  }
  & > div > div > img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    background-color: transparent;
  }
  
  & > div > div >div> img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    background-color: transparent;
  }

  

  & > img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    background-color: transparent;
  }
`;
