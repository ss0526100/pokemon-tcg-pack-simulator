import { SVGProps } from 'react';

interface UpArrowSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function UpArrowSvg(props: UpArrowSvgProps) {
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
      viewBox='0 0 64 64'
      xmlSpace='preserve'
      {...restProps}
    >
      <polyline points='6.53 45.14 33.16 19.88 57.42 45.14' />
    </svg>
  );
}
