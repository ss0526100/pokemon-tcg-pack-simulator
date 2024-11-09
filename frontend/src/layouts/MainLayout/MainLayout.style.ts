import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
`;
