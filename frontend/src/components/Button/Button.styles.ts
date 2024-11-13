import COLOR from '../../constant/colors';
import { css } from '@emotion/react';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  circle?: boolean;
}
const PRIMARY_COLOR = COLOR.PRIMARY_COLOR;
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

const getSize = ({ circle }: ButtonProps) => {
  if (circle)
    return `
    width: 60px;
    height: 60px;
  `;
  return `width: 100%;`;
};

const getBorderRadius = ({ circle }: ButtonProps) => {
  if (circle)
    return `
    50%;
  `;
  return `40px`;
};
export const button = (props: ButtonProps) => css`
  ${getSize(props)}
  padding: 2rem;

  font-size: 20px;
  font-weight: ${getFontWeight(props)};
  color: ${getFontColor(props)};
  white-space: nowrap;

  background-color: ${getBackgroundColor(props)};
  border: ${getBorder(props)};
  border-radius: ${getBorderRadius(props)};
`;
