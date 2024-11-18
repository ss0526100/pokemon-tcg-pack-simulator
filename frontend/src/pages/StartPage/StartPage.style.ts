import { css } from '@emotion/react';

export const dimmer = css`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding: 480px 0 0;

  background-color: #ffffff80;

  @media (width<=600px) {
    padding: 83vh 0 0;
  }
`;

export const span = css`
  z-index: 9999;

  padding: 10px;

  font-size: 20px;
  text-align: center;

  background-color: #00000030;
  border-radius: 20px;
`;
