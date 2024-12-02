import COLOR from '../../constant/colors';
import { css } from '@emotion/react';

export const contour = css`
  position: relative;

  display: block;

  width: 100%;
  height: 14px;
  margin: 10px 0;

  background: linear-gradient(180deg, ${COLOR.MAIN_GRAY}40, #0000 80%);
`;
