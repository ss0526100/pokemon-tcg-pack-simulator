import { css } from '@emotion/react';

export const layout = css`
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  max-width: 600px;
  height: 900px;
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
  padding: 2rem;
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
