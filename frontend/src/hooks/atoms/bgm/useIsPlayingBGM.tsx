import { atom, useRecoilState } from 'recoil';

import { useEffect } from 'react';

const isPlayingBGM = atom<boolean>({
  key: 'isPlayingBGM', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default function useIsPlayingBGM() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingBGM);
  useEffect(() => {
    localStorage.setItem('isPlaying', JSON.stringify(isPlaying));
  }, [isPlaying]);

  return [isPlaying, setIsPlaying] as const;
}
