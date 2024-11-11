import { atom, useRecoilState } from 'recoil';

const rarityCntMap = atom<Map<Rarity, number>>({
  key: 'rarityCntMap', // unique ID (with respect to other atoms/selectors)
  default: new Map(), // default value (aka initial value)
});

export default function useRarityCntMap() {
  return useRecoilState(rarityCntMap);
}
