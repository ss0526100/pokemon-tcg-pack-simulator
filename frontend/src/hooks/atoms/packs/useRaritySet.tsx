import { atom, useRecoilState } from 'recoil';

const rarityIdSet = atom<Set<string>>({
  key: 'rarityIdSet', // unique ID (with respect to other atoms/selectors)
  default: new Set<string>(), // default value (aka initial value)
});

const starIdSet = atom<Set<string>>({
  key: 'starIdSet', // unique ID (with respect to other atoms/selectors)
  default: new Set<string>(), // default value (aka initial value)
});

const crownIdSet = atom<Set<string>>({
  key: 'crownIdSet', // unique ID (with respect to other atoms/selectors)
  default: new Set<string>(), // default value (aka initial value)
});

export function useRarityIdSet() {
  return useRecoilState(rarityIdSet);
}

export function useStarIdSet() {
  return useRecoilState(starIdSet);
}

export function useCrownIdSet() {
  return useRecoilState(crownIdSet);
}
