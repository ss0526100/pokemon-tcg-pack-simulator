import { atom, useRecoilState } from 'recoil';

const cardIdCntMap = atom<Map<string, number>>({
  key: 'cardIdCntMap', // unique ID (with respect to other atoms/selectors)
  default: new Map<string, number>(), // default value (aka initial value)
});

export default function useCardIdCntMap() {
  return useRecoilState(cardIdCntMap);
}
