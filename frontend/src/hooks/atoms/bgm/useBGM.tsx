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

    return () => {
      audio.current.pause();
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
