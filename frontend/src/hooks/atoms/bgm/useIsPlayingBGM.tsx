import { atom, useRecoilState } from 'recoil';

const isPlayingBGM = atom<boolean>({
  key: 'isPlayingBGM', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default function useIsPlayingBGM() {
  return useRecoilState(isPlayingBGM);
}
