import { SVGProps } from 'react';

interface PlusSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function PlusSvg(props: PlusSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      fill='none'
      height={`${size}px`}
      width={`${size}px`}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      xmlSpace='preserve'
      {...restProps}
    >
      <path
        d='M4 12H20M12 4V20'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
