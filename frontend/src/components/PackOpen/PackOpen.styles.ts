import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: center;
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
  background-color: transparent;
  &:hover {
    background-color: #0000003f;
  }
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  margin: 2rem 0;

  animation: text-focus-in 200ms cubic-bezier(0.55, 0.085, 0.68, 0.53) both;

  @-webkit-keyframes text-focus-in {
    0% {
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
    }
  }
  @keyframes text-focus-in {
    0% {
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
    }
  }
`;
