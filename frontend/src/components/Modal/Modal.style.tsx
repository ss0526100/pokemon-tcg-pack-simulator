import { css } from '@emotion/react';

export const dimmer = ({ hasDarkDimmer }: { hasDarkDimmer?: boolean }) => css`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 99999999;
  width: 100vw;
  height: 100vh;

  transform: translateY(${window.scrollY}px);

  background-color: ${hasDarkDimmer ? 'rgba(0,0,0,23%)' : 'transparent'};
`;
const defaultContentStyle = css`
  position: absolute;

  max-width: 100%;
  padding: 2.4rem 3.2rem;
  z-index: 199999999;

  background-color: #f0f4fa;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 25%);
`;

export const content = ({ position }: { position: 'bottom' | 'center' }) => {
  if (position === 'center') {
    return css`
      ${defaultContentStyle}
      top: 0;
      left: 0;
      transform: translate(
        calc(min(50vw, 300px) - 50%),
        calc(50vh - 50% + ${window.scrollY}px)
      );
    `;
  }
  if (position === 'bottom') {
    return css`
      ${defaultContentStyle}
      top: 0;
      left: 0;

      transform: translate(
        calc(min(50vw, 300px) - 50%),
        calc(100vh - 100% + ${window.scrollY}px)
      );

      margin: 0 auto;

      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    `;
  }
};
