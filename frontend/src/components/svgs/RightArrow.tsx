import { SVGProps } from 'react';

interface RightArrowProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function RightArrow(props: RightArrowProps) {
  const { size = 20, fill = 'white', strokeWidth, ...restProps } = props;

  return (
    <svg
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 407.436 407.436'
      xmlSpace='preserve'
      {...restProps}
    >
      <polygon
        points='112.814,0 91.566,21.178 273.512,203.718 91.566,386.258 112.814,407.436 315.869,203.718 '
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
