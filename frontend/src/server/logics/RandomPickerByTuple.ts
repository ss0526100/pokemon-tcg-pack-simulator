import getRandom from '../../utils/getRandom';

export default class RandomPickerByTuple<T> {
  private nameList: T[];
  private accList: number[];
  constructor(percentTuple: PercentTuple<T>) {
    this.nameList = percentTuple.map(c => c[0]);

    this.accList = this.getAccList(percentTuple);
  }

  getRandomValue() {
    const sumOfPercent = this.accList[this.accList.length - 1];
    const nowPercent = getRandom() * sumOfPercent;
    const nowIndex = this.accList.findIndex(c => nowPercent <= c);
    if (nowIndex === -1) return this.nameList[this.nameList.length - 1];
    return this.nameList[nowIndex];
  }

  private getAccList(percentTuple: PercentTuple<T>) {
    let sum = 0;
    // eslint-disable-next-line
    const accList = percentTuple.map(([_, value]) => (sum += value));

    return accList;
  }
}
