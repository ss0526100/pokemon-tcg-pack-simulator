import useIsPlayingBGM from './useIsPlayingBGM';
import useNowBGM from './useNowBgm';

export default function useBGMUtils() {
  const [, setNowBGM] = useNowBGM();
  const [isPlayingBGM, setIsPlayingBGM] = useIsPlayingBGM();

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
