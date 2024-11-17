import { useEffect, useRef } from 'react';

import chooseGetChallenge from '../../../assets/audios/bgm/select-get-challenge.m4a';
import openPack from '../../../assets/audios/bgm/open-pack.m4a';
import playChallenge from '../../../assets/audios/bgm/play-get-challenge.m4a';
import selectPack from '../../../assets/audios/bgm/pack-select.m4a';
import useIsPlayingBGM from './useIsPlayingBGM';
import useNowBGM from './useNowBgm';

const bgmMapper: Record<Page, string> = {
  packSelect: selectPack,
  packOpen: openPack,
  chooseChallenge: chooseGetChallenge,
  playChallenge: playChallenge,
};
export default function useBGM(page: Page) {
  const [nowBGM, setNowBGM] = useNowBGM();
  const [isPlayingBGM, setIsPlayingBGM] = useIsPlayingBGM();
  const audio = useRef(new Audio(bgmMapper[page]));

  useEffect(() => {
    if (page) setNowBGM(page);
    if (!nowBGM) return;
    if (!isPlayingBGM) {
      audio.current.muted = true;
      return;
    }
    if (audio.current.src === bgmMapper[nowBGM]) {
      audio.current.muted = false;
      return;
    }
    audio.current = new Audio(bgmMapper[nowBGM]);
    audio.current.volume = 1;
    audio.current.loop = true;
    audio.current.play();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (audio.current) {
          audio.current.pause(); // 화면이 비활성화되면 오디오 멈추기
        }
      } else {
        if (audio.current) {
          audio.current.play(); // 화면이 활성화되면 오디오 재생 (필요시)
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      audio.current.pause();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [nowBGM, isPlayingBGM, page, setNowBGM]);

  const changeBGM = (page: Page) => {
    setNowBGM(page);
  };

  const pauseBGM = () => {
    setIsPlayingBGM(false);
  };

  const playBGM = () => {
    setIsPlayingBGM(true);
  };

  const cutBGM = () => {
    setNowBGM(null);
  };

  return { changeBGM, pauseBGM, playBGM, cutBGM };
}
