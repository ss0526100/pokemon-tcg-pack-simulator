import { SVGProps } from 'react';

interface PlusMinusSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function PlusMinusSvg(props: PlusMinusSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      fill='none'
      height={`${size}px`}
      width={`${size}px`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      xmlSpace='preserve'
      {...restProps}
    >
      <path
        d='M20 4L4 20'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M4 7H7M10 7H7M7 7V4M7 7V10'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M14 17H17H20'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}
