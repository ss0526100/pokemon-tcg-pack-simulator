import COLOR from '../../constant/colors';
import { css } from '@emotion/react';

export const layout = css`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 100vw;
  max-width: 600px;
  height: 100vh;

  background-color: ${COLOR.MAIN_BACKGROUND};
`;

export const title = css`
  padding: 3%;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const selectRow = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 0 5% 2rem;
`;

export const dropdownRow = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;

  width: 100%;
  padding: 0 5% 2rem;
`;

export const selectItem = css`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  width: 30%;
  height: 22px;

  font-size: 1rem;

  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgb(0 0 0 / 20%);
`;

export const selectSpan = css`
  font-size: 10px;
`;

export const rarityContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 18px;
`;
export const cardList = css`
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
  flex-wrap: wrap;
  gap: 2%;

  width: 90%;
  height: 80%;
`;

export const emptyCardFallback = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 90%;
  height: 80%;

  font-size: 20px;
`;

export const cardContainer = css`
  position: relative;
  align-content: flex-start;
  width: 23%;

  & > img {
    width: 100%;
    height: auto;
  }
`;

export const cardCount = css`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 30px;

  font-size: 14px;
  color: white;
  text-align: center;

  background-color: grey;
  border-top-right-radius: 10px;
`;

export const bottomButtonContainer = css`
  width: 100%;
  padding: 2%;
`;

export const cardDetailCardContainer = css`
  width: 80vw;
  max-width: 480px;

  & > img {
    width: 100%;
    height: auto;
  }
`;
