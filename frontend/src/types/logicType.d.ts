type PercentTuple<T> = [T, number][];

type RarePackPercentTuple = PercentTuple<'rare' | 'normal'>;
type RarityPercentTuple = PercentTuple<Rarity>;
