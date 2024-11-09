import { css } from '@emotion/react';

export const layout = css`
  position: fixed;
  transform: translate(-50%, 0);
  left: 50%;

  display: flex;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
`;
