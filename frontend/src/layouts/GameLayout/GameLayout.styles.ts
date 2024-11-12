import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 820px;

  user-select: none;
  max-width: 600px;
  width: 100vw;
`;

export const content = css`
  display: flex;
  padding: 3rem 0 0;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 600px;

  max-width: 480px;
  width: calc(100vw - 4rem);
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
  max-width: 480px;
  width: calc(100vw - 4rem);
  display: flex;
  justify-content: ${getJustifyContent(props)};
  gap: 1rem;
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
  width: calc(100vw - 4rem);
  align-items: center;
`;
