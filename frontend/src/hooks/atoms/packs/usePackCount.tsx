import { atom, useRecoilState } from 'recoil';

const packCount = atom<number>({
  key: 'packCount',
  default: 10,
});

export default function usePackCount() {
  return useRecoilState(packCount);
}
