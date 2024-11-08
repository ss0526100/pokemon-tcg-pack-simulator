type Percent = number;
export default function getRandomStrByPercentFunc<T>(list: [T, Percent][]) {
  const sumOfPercentage = list.reduce((a, [_, percent]) => a + percent, 0);
  let sum = 0;
  const accList = list.map(([_, value]) => (sum += value) / sumOfPercentage);
  accList[accList.length - 1] = 1;

  return () => {
    const nowRandom = Math.random();

    const nowIndex = accList.findIndex(c => nowRandom <= c) || list.length - 1;
    return list[nowIndex][0];
  };
}
