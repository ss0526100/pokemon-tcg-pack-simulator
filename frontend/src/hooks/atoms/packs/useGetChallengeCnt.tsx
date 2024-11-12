import { atom, useRecoilState } from 'recoil';

const getChallengeCnt = atom<number>({
  key: 'getChallengeCnt', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default function useGetChallengeCnt() {
  return useRecoilState(getChallengeCnt);
}
