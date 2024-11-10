export default function increaseCntMap<T>(map: Map<T, number>, target: T) {
  const beforeCnt = map.get(target) || 0;
  map.set(target, beforeCnt + 1);
}
