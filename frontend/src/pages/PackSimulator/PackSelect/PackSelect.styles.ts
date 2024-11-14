import { css, keyframes } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  height: 600px;
  padding: 3rem 0 0;
`;

export const contentContainer = css`
  display: flex;
  gap: 0.5rem;
`;

export const selectContainer = css`
  display: flex;
  align-items: center;
  border-radius: 40px;

  &:hover {
    background-color: #0000003f;
  }
`;

export const svgContainer = css`
  padding: 10px;
  background-color: transparent;
  border-radius: 100%;
`;

export const button = css`
  font-size: clamp(10px, 4.5vw, 20px);
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
`;
export const packContainer = css`
  animation: ${bounce} 3.5s ease-in-out infinite;
`;
