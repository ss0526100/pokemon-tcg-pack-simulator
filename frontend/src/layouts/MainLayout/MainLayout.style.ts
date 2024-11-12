import { css } from '@emotion/react';

export const layout = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  padding: 2rem;
`;
