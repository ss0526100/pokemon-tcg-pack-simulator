import { atom, useRecoilState } from 'recoil';

const packOpenOneTime = atom<boolean>({
  key: 'packOpenOneTime',
  default: false,
});

export default function usePackOpenOneTime() {
  return useRecoilState(packOpenOneTime);
}
