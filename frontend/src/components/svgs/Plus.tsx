import { SVGProps } from 'react';

interface PlusSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function PlusSvg(props: PlusSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 404.258 404.258'
      xmlSpace='preserve'
      {...restProps}
    >
      <polygon points='289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 ' />
    </svg>
  );
}
