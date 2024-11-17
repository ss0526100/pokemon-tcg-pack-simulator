import { css } from '@emotion/react';
import isAppleDevice from '../../../utils/isAppleDevice';

export const boxContainer = css`
  aspect-ratio: 1/1;
  width: 100%;
  max-width: 440px;
  max-height: 440px;
  padding: 10px;

  background: #ffffffa9;
  border: 1px solid #00000029;
  border-radius: 20px;
`;

export const container = css`
  ${isAppleDevice() ? '' : 'scroll-behavior: smooth;'}
  overflow-y: scroll;
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 20px;

  transform: translateY(-35px);
`;
