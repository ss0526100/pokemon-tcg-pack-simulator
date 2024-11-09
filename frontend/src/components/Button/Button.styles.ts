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

const getFontWeight = ({ primary, secondary }: ButtonProps) => {
  if (primary) return '600';
  if (secondary) return `550`;
  return '600';
};

export const button = (props: ButtonProps) => css`
  width: 100%;

  border-radius: 40px;

  background-color: ${getBackgroundColor(props)};
  color: ${getFontColor(props)};

  font-size: 20px;
  font-weight: ${getFontWeight(props)};

  padding: 2rem;
  border: ${getBorder(props)};
`;
