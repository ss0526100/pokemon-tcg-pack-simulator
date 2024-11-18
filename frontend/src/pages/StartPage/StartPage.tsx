import * as S from './StartPage.style';

import { useEffect, useState } from 'react';

import useBGM from '../../hooks/atoms/bgm/useBGM';

export default function StartPage() {
  const [isInteracted, setIsInteracted] = useState(false);
  const { playBGM } = useBGM();
  useEffect(() => {
    function clickHandler(e: MouseEvent) {
      e.stopPropagation();
      setIsInteracted(true);
      playBGM();
      cleanUp();
    }

    function keydownHandler(e: KeyboardEvent) {
      e.stopPropagation();
      setIsInteracted(true);
      playBGM();
      cleanUp();
    }

    function cleanUp() {
      removeEventListener('click', clickHandler);
      removeEventListener('keydown', keydownHandler);
    }

    addEventListener('click', clickHandler);
    addEventListener('keydown', keydownHandler);

    return cleanUp;
  }, [playBGM]);

  if (isInteracted) return null;

  return (
    <div css={S.dimmer}>
      <span css={S.span}>- 아무 곳이나 눌러 시작하세요 -</span>
    </div>
  );
}
