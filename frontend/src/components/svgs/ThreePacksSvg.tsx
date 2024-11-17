interface ThreePacksSvgProps {
  size?: number;
  fill?: string;
}

export default function ThreePacksSvg(props: ThreePacksSvgProps) {
  const { size = 20, fill = 'white', ...restProps } = props;

  return (
    <svg
      version='1.1'
      id='Capa_1'
      viewBox='0 0 37 37'
      xmlSpace='preserve'
      fill={fill}
      width={`${size}px`}
      height={`${size}px`}
      {...restProps}
    >
      <g>
        <g>
          <rect y='3.016' width='9.426' height='30.968' />
          <rect x='12.787' y='3.016' width='9.426' height='30.968' />
          <rect x='25.574' y='3.016' width='9.426' height='30.968' />
        </g>
      </g>
    </svg>
  );
}
