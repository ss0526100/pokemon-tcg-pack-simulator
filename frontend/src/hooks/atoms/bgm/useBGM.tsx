import chooseGetChallenge from '../../../assets/audios/bgm/select-get-challenge.m4a';
import openPack from '../../../assets/audios/bgm/open-pack.m4a';
import playChallenge from '../../../assets/audios/bgm/play-get-challenge.m4a';
import selectPack from '../../../assets/audios/bgm/pack-select.m4a';
import { useEffect } from 'react';
import useIsPlayingBGM from './useIsPlayingBGM';
import useNowBGM from './useNowBgm';

const bgmMapper: Record<Page, string> = {
  packSelect: selectPack,
  packOpen: openPack,
  chooseChallenge: chooseGetChallenge,
  playChallenge: playChallenge,
};
const audio = new Audio();
export default function useBGM(page?: Page) {
  const [nowBGM, setNowBGM] = useNowBGM();
  const [isPlayingBGM, setIsPlayingBGM] = useIsPlayingBGM();

  useEffect(() => {
    if (page) setNowBGM(page);
    if (!nowBGM) return;
    if (!isPlayingBGM) {
      audio.pause();
      return;
    }
    if (audio.src === bgmMapper[nowBGM]) {
      audio.muted = false;
      return;
    }
    audio.src = bgmMapper[nowBGM];
    audio.volume = 1;
    audio.loop = true;
    audio.play();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        audio.pause(); // 화면이 비활성화되면 오디오 멈추기
      } else {
        audio.play(); // 화면이 활성화되면 오디오 재생 (필요시)
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      audio.pause();
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

  const toggleBGM = () => {
    setIsPlayingBGM(prev => !prev);
  };

  return { changeBGM, pauseBGM, playBGM, cutBGM, toggleBGM, isPlayingBGM };
}
