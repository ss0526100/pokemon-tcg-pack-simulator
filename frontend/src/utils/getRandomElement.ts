import getRandom from './getRandom';

export default function getRandomElement<T>(list: T[]) {
  const targetIdx = Math.floor(getRandom() * list.length);
  if (targetIdx < 0 || targetIdx >= list.length) return undefined;
  return list[targetIdx];
}
