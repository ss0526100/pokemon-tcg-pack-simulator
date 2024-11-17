import { css } from '@emotion/react';

export const layout = css`
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  max-width: 600px;
  height: 100vh;

  @media (width <= 600px) {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  width: calc(100vw - 4rem);
  max-width: 480px;
  height: 560px;
  padding: 3rem 0 0;

  @media (width <= 600px) {
    width: 100vw;
    height: 100vh;
  }
`;

interface ToolbarProps {
  leftFirst?: boolean;
  rightFirst?: boolean;
  childrenLength: number;
}
const getJustifyContent = ({
  leftFirst,
  childrenLength,
}: {
  leftFirst?: boolean;
  rightFirst?: boolean;
  childrenLength: number;
}) => {
  if (childrenLength >= 2) return 'space-between';
  if (leftFirst) return 'space-between';
  return 'flex-end';
};

export const toolbarContainer = (props: ToolbarProps) => css`
  display: flex;
  gap: 1rem;
  justify-content: ${getJustifyContent(props)};

  width: calc(100vw - 4rem);
  max-width: 480px;
  height: 200px;
  padding: 2rem;

  @media (width <= 600px) {
    display: none;
  }
`;

export const toolbarLeft = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const toolbarRight = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const description = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 4rem);
`;
