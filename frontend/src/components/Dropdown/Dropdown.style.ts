import COLOR from '../../constant/colors';
import { css } from '@emotion/react';

export const dropdown = css`
  position: relative;
  width: 30%;
`;

export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 25px;

  background-color: ${COLOR.MAIN_BACKGROUND};
  border-radius: 14px;
  box-shadow: 4px 2px 10px 10px rgb(0 0 0 / 10%),
    -4px -4px 4px 1px ${COLOR.MAIN_GRAY}20 inset;
`;

export const headerValue = css`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 60%;
  padding: 0 0 0 10%;

  font-size: 14px;
  color: ${COLOR.MAIN_GRAY};
`;

export const optionContainer = css`
  position: absolute;
  z-index: 9999999999;
  top: 100%;
  right: 0;
  left: 0;

  width: 95%;
  margin: 0 auto;
  padding: 1rem 0.5rem;

  background-color: ${COLOR.MAIN_BACKGROUND};
  border-radius: 15px;
  box-shadow: 4px 2px 10px 10px rgb(0 0 0 / 10%),
    -4px -4px 4px 1px ${COLOR.MAIN_GRAY}10 inset;
`;

export const option = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: space-around;

  width: 100%;
  height: 20px;
  margin: 5px 0;

  font-size: 14px;
  color: ${isSelected ? COLOR.MAIN_BACKGROUND : COLOR.MAIN_GRAY};

  background-color: ${isSelected ? COLOR.MAIN_GRAY : COLOR.MAIN_BACKGROUND};
  ${isSelected &&
  'box-shadow: -5px -5px 1px 1px rgba(255,255,255, 0.01) inset,2px 5px 3px 1px rgba(0,0,0, 0.2) inset;'}
  border-radius: 15px;
`;

export const dimmer = css`
  position: fixed;
  z-index: 9999999998;

  width: 100vw;
  height: 100vh;

  background-color: transparent;
`;
