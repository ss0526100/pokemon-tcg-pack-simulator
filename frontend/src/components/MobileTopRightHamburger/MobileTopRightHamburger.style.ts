import { css, keyframes } from '@emotion/react';

export const hamburger = css`
  display: none;

  @media (width<=600px) {
    position: fixed;
    z-index: 2;
    top: 20px;
    right: 20px;

    display: block;
  }
`;

const popup = keyframes`
  0%{
    transform:translateY(100%);
  }

  100%{
  transform:translateY(0);
  }
`;
// const popDown = keyframes`
//   from{
//     transform:translateY(0);
//   }

//   to{
//   transform:translateY(100vh);
//   }
// `;
export const rightBox = css`
  display: none;
  animation: ${popup} 0.1s;

  @media (width<=600px) {
    position: fixed;
    z-index: 2;
    top: 60px;
    right: 0;

    display: block;

    padding: 2rem;

    background-color: #f0f4fa;
    border-radius: 30px 0 0 30px;
  }
`;

export const dimmer = css`
  display: none;

  @media (width<=600px) {
    position: fixed;
    z-index: 2;
    top: -5vh;
    left: -5vw;

    display: block;

    width: 105vw;
    height: 105vh;

    background-color: rgb(0 0 0 / 43%);
  }
`;

export const optionContainer = css`
  display: none;

  @media (width<=600px) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;

    width: 50vw;
    height: 40px;
  }
`;

export const button = css`
  display: none;

  @media (width<=600px) {
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 30px;
    height: 30px;
    padding: 0;
  }
`;

export const optionSpan = css`
  display: none;

  @media (width<=600px) {
    display: inline;
    font-size: 13px;
    line-height: 100%;
  }
`;

export const line = css`
  display: none;

  @media (width<=600px) {
    display: block;

    width: 100%;
    height: 1px;
    margin: 10px 0;

    background-color: rgb(0 0 0 / 20%);
  }
`;
