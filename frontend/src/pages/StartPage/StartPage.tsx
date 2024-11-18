import * as S from './StartPage.style';

import { useEffect, useState } from 'react';

import useBGM from '../../hooks/atoms/bgm/useBGM';

export default function StartPage() {
  const [isInteracted, setIsInteracted] = useState(false);
  const { playBGM, pauseBGM } = useBGM();
  useEffect(() => {
    if (isInteracted) return;
    if (!localStorage.getItem('isPlaying'))
      localStorage.setItem('isPlaying', JSON.stringify(true));
    const isPlaying = JSON.parse(localStorage.getItem('isPlaying') || 'true');
    function clickHandler(e: MouseEvent) {
      e.stopPropagation();
      setIsInteracted(true);
      if (isPlaying) playBGM();
      if (!isPlaying) pauseBGM();
      cleanUp();
    }

    function keydownHandler(e: KeyboardEvent) {
      e.stopPropagation();
      setIsInteracted(true);

      if (isPlaying) playBGM();
      if (!isPlaying) pauseBGM();
      cleanUp();
    }

    function cleanUp() {
      removeEventListener('click', clickHandler);
      removeEventListener('keydown', keydownHandler);
    }

    addEventListener('click', clickHandler);
    addEventListener('keydown', keydownHandler);

    return cleanUp;
  }, [isInteracted]);

  if (isInteracted) return null;

  return (
    <div css={S.dimmer}>
      <span css={S.span}>- 아무 곳이나 눌러 시작하세요 -</span>
    </div>
  );
}
