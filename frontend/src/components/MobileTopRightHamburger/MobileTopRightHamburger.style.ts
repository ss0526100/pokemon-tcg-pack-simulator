import { css } from '@emotion/react';

export const hamburger = css`
  display: none;

  @media (width<=600px) {
    position: fixed;
    top: 20px;
    right: 20px;
    display: block;
  }
`;

export const rightBox = css`
  display: none;

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

export const optionContainer = css`
  display: none;

  @media (width<=600px) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 50vw;
  }
`;

export const button = css`
  display: none;

  @media (width<=600px) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 40px;
    height: 40px;
    padding: 0;
  }
`;

export const optionSpan = css`
  display: none;

  @media (width<=600px) {
    font-size: 20px;
  }
`;
