import { atom, useRecoilState } from 'recoil';

const cardCount = atom<number>({
  key: 'packCount', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default function useCardCount() {
  return useRecoilState(cardCount);
}
