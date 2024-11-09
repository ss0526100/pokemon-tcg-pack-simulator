import { css } from '@emotion/react';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}
const PRIMARY_COLOR = '#3de086';
const getBackgroundColor = ({ primary, secondary }: ButtonProps) => {
  if (primary) return PRIMARY_COLOR;
  if (secondary) return 'white';
  return PRIMARY_COLOR;
};

const getFontColor = ({ primary, secondary }: ButtonProps) => {
  if (primary) return 'white';
  if (secondary) return PRIMARY_COLOR;
  return 'white';
};

const getBorder = ({ primary, secondary }: ButtonProps) => {
  if (primary) return '0';
  if (secondary) return `1px solid${PRIMARY_COLOR}`;
  return '0';
};

export const button = (props: ButtonProps) => css`
  width: 100%;

  border-radius: 40px;

  background-color: ${getBackgroundColor(props)};
  color: ${getFontColor(props)};

  font-size: 20px;
  font-weight: 600;

  padding: 2rem;
  border: ${getBorder(props)};

  margin: 20px 0;
`;
