import { atom, useRecoilState } from 'recoil';

const nowBGM = atom<Page | null>({
  key: 'nowBGM', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default function useNowBGM() {
  return useRecoilState(nowBGM);
}
