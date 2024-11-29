import getRandom from '../../utils/getRandom';

export default class RandomPickerByTuple<T> {
  private valueList: T[];
  private accList: number[];
  constructor(percentTuple: PercentTuple<T>) {
    this.valueList = percentTuple.map(c => c[0]);

    this.accList = this.getAccList(percentTuple);
  }

  getRandomValue() {
    const sumOfPercent = this.accList[this.accList.length - 1];
    const nowPercent = getRandom() * sumOfPercent;
    const nowIndex = this.accList.findIndex(c => nowPercent <= c);
    if (nowIndex === -1) return this.valueList[this.valueList.length - 1];
    return this.valueList[nowIndex];
  }

  private getAccList(percentTuple: PercentTuple<T>) {
    let sum = 0;
    // eslint-disable-next-line
    const accList = percentTuple.map(([_, value]) => (sum += value));

    return accList;
  }
}
