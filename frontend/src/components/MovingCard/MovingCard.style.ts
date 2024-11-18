import { css } from '@emotion/react';

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getRotateX = ({ y, height }: Position) => {
  return -50 * ((y - height / 2) / height);
};

const getRotateY = ({ x, width }: Position) => {
  return 50 * ((x - width / 2) / width);
};
export const container = (props?: Position) => css`
  height: 100%;
  transition: all 0.2s;

  ${props
    ? `transform : perspective(350px) rotateX(${getRotateX(
        props
      )}deg) rotateY(${getRotateY(props)}deg);`
    : ''}
  & > img {
    height: 100%;
    object-fit: cover;
  }

  @media (width<=600px) {
    & > img {
      width: 100%;
    }
  }
`;

// `transform : perspective(350px) rotateX(${
//         (-1 / 5) * position.x + 10
//       }deg) rotateY(${(4 / 30) * position.y - 10}deg);`
