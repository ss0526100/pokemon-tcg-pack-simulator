import COLOR from '../../constant/colors';
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 70px;
  padding: 20px;

  background-color: white;
  border: 1px solid ${COLOR.PRIMARY_COLOR};
  border-radius: 999px;
`;

export const counter = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40%;
  padding: 20px;

  font-size: 3rem;
  color: ${COLOR.PRIMARY_COLOR};
`;

export const buttonWrapper = css`
  width: 60px;
`;
