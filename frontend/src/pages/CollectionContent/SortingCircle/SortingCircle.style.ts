import COLOR from '../../../constant/colors';
import { css } from '@emotion/react';

export const sortingCircle = css`
  position: fixed;
  top: 78vh;
  right: 20px;
`;

export const sortingButton = css`
  display: flex;
  flex-shrink: 0;
  gap: 0;
  align-items: center;
  justify-content: center;
`;

export const sortingButtonStandard = css`
  flex-shrink: 0;
`;

export const sortingButtonOrder = css`
  flex-shrink: 0;
  margin: -8px;
`;

export const modalContent = css`
  width: 82vw;
  max-width: 480px;
`;

export const modalHeader = css`
  display: block;

  width: 100%;

  font-size: 30px;
  font-weight: 700;
  color: ${COLOR.TITLE};
  text-align: center;
`;

export const modalItemContainer = css`
  padding: 10px 0;
`;
export const modalItem = (isSelected: boolean) => css`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 50px;
  padding: 0 20px;

  font-size: 20px;

  border-radius: 30px;

  ${isSelected &&
  `background-color: ${COLOR.MAIN_GRAY};
  & > span {
  color:white;
  font-weight:400
  }`}
`;

export const modalItemSvg = css`
  position: absolute;
  top: 0;
  right: -30px;
  bottom: 0;

  margin: auto;

  color: ${COLOR.MAIN_GRAY};
`;
