import { SVGProps } from 'react';

interface RaritySvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function RaritySvg(props: RaritySvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      stroke={fill}
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      strokeWidth='4'
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      {...restProps}
    >
      <g>
        <path
          d='M456.225,244.286L270.989,7.314C267.382,2.7,261.857,0,255.999,0c-5.856,0-11.381,2.7-14.989,7.314
		L55.775,244.286c-5.378,6.884-5.378,16.544,0,23.428l185.236,236.972c3.608,4.616,9.132,7.314,14.989,7.314
		c5.858,0,11.383-2.698,14.99-7.314l185.236-236.972C461.603,260.83,461.603,251.17,456.225,244.286z M255.999,477.522L82.84,256
		L255.999,34.478L429.17,256L255.999,477.522z'
        />
      </g>
    </svg>
  );
}
