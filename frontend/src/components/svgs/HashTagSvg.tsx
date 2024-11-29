import { SVGProps } from 'react';

interface HashTagSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function HashTagSvg(props: HashTagSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      stroke={fill}
      fill='none'
      height={`${size}px`}
      width={`${size}px`}
      strokeWidth='4'
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      xmlSpace='preserve'
      {...restProps}
    >
      <path
        d='M10 4L7 20M17 4L14 20M5 8H20M4 16H19'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
