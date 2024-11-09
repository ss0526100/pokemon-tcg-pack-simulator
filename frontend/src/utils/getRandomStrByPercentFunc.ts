type Percent = number;
export default function getRandomStrByPercentFunc<T>(list: [T, Percent][]) {
  // eslint-disable-next-line
  const sumOfPercentage = list.reduce((a, [_, percent]) => a + percent, 0);
  let sum = 0;
  // eslint-disable-next-line
  const accList = list.map(([_, value]) => (sum += value));
  accList[accList.length - 1] = sumOfPercentage;
  const tmp = [];

  return () => {
    const nowRandom = Math.random() * sumOfPercentage;
    tmp.push(nowRandom);

    const nowIndex = accList.findIndex(c => nowRandom <= c);
    if (nowIndex === -1) return list[list.length - 1][0];
    return list[nowIndex][0];
  };
}
