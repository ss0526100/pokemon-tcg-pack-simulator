import { SVGProps } from 'react';

interface DownArrowSolidSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export default function DownArrowSolidSvg(props: DownArrowSolidSvgProps) {
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
        d='M7.71967 12.9697C8.01256 12.6768 8.48744 12.6768 8.78033 12.9697L11.25 15.4393L11.25 6.75C11.25 6.33579 11.5858 6 12 6C12.4142 6 12.75 6.33579 12.75 6.75L12.75 15.4393L15.2197 12.9697C15.5126 12.6768 15.9874 12.6768 16.2803 12.9697C16.5732 13.2626 16.5732 13.7374 16.2803 14.0303L12.5303 17.7803C12.2374 18.0732 11.7626 18.0732 11.4697 17.7803L7.71967 14.0303C7.42678 13.7374 7.42678 13.2626 7.71967 12.9697Z'
      />
    </svg>
  );
}
