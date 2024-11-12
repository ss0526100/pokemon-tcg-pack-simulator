import getRandom from './getRandom';

export default function fisherShuffle<T>(array: T[]) {
  // 배열을 끝에서부터 순차적으로 무작위 인덱스와 교환
  for (let i = array.length - 1; i > 0; i--) {
    // 0과 i 사이의 무작위 인덱스를 생성
    const j = Math.floor(getRandom() * (i + 1));

    // 요소 교환
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
