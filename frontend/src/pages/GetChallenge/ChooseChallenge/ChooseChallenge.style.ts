import { css } from '@emotion/react';
import isAppleDevice from '../../../utils/isAppleDevice';

export const boxContainer = css`
  width: 100%;
  max-width: 440px;
  height: 50%;
  max-height: 440px;
  padding: 10px;

  background: #ffffffa9;
  border-radius: 20px;
`;

export const container = css`
  ${isAppleDevice() ? '' : 'scroll-behavior: smooth;'}
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 20px;
`;
