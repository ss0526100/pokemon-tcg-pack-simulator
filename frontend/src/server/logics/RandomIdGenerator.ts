import getRandomElement from '../../utils/getRandomElement';

export default class RandomIdGenerator<Rarity extends string> {
  private cardRecords: Record<Rarity, string[]>;
  private rarityGenerators: { getRandomValue: () => Rarity };
  constructor(
    cardRecords: Record<Rarity, string[]>,
    rarityGenerators: { getRandomValue: () => Rarity }
  ) {
    this.cardRecords = cardRecords;
    this.rarityGenerators = rarityGenerators;
  }

  getId() {
    const nowRarity = this.rarityGenerators.getRandomValue();
    const nowIdList = this.cardRecords[nowRarity];

    const nowId = getRandomElement(nowIdList);
    return nowId;
  }
}
