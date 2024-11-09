export default function getRandomElement<T>(list: T[]) {
  const targetIdx = Math.floor(Math.random() * list.length);
  if (targetIdx < 0 || targetIdx >= list.length) return undefined;
  return list[targetIdx];
}
