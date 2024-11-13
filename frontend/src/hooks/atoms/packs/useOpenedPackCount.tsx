import { atom, useRecoilState } from 'recoil';

const openedPackCount = atom<number>({
  key: 'openedPackCount',
  default: 0,
});

export default function useOpenedPackCount() {
  return useRecoilState(openedPackCount);
}
