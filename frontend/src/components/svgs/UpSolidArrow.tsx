import { SVGProps } from 'react';

interface UpArrowSolidSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function UpArrowSolidSvg(props: UpArrowSolidSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      stroke={fill}
      fill={fill}
      height={`${size}px`}
      width={`${size}px`}
      strokeWidth='1'
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      xmlSpace='preserve'
      {...restProps}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.2803 11.0303C15.9874 11.3232 15.5126 11.3232 15.2197 11.0303L12.75 8.56066L12.75 17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25L11.25 8.56066L8.78033 11.0303C8.48744 11.3232 8.01256 11.3232 7.71967 11.0303C7.42678 10.7374 7.42678 10.2626 7.71967 9.96967L11.4697 6.21967C11.7626 5.92678 12.2374 5.92678 12.5303 6.21967L16.2803 9.96967C16.5732 10.2626 16.5732 10.7374 16.2803 11.0303Z'
      />
    </svg>
  );
}
