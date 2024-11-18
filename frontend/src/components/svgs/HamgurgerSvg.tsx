import { SVGProps } from 'react';

interface LeftArrowSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function HamburgerSvg(props: LeftArrowSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${size} ${size}`}
      xmlSpace='preserve'
      {...restProps}
    >
      <path
        d={`M4 ${(size >> 2) * 1}H${size - 2}`}
        stroke={fill}
        strokeWidth={size / 15}
        strokeLinecap='round'
      />
      <path
        d={`M4 ${(size >> 2) * 2}H${size - 2}`}
        stroke={fill}
        strokeWidth={size / 15}
        strokeLinecap='round'
      />
      <path
        d={`M4 ${(size >> 2) * 3}H${size - 2}`}
        stroke={fill}
        strokeWidth={size / 15}
        strokeLinecap='round'
      />
    </svg>
  );
}
