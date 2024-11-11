type Rarity = 'crown' | 's3' | 's2' | 's1' | 'r4' | 'r3' | 'r2' | 'r1';

type Expansion = 'A1' | 'Promo';

type A1PackType = 'charizard' | 'pikachu' | 'mewtwo';

type PackType = A1PackType;

type PokemonCategory = 'normal' | 'ev1' | 'ev2' | 'ex';
type TrainersCategory = 'supporter' | 'item' | 'item-fossil';

type Category = PokemonCategory | TrainersCategory;

// type PokemonType =
//   | 'Grass'
//   | 'Fire'
//   | 'Water'
//   | 'Lightning'
//   | 'Psychic'
//   | 'Fighting'
//   | 'Darkness'
//   | 'Metal'
//   | 'Dragon'
//   | 'Colorless'
//   | 'nonPokemon';

type CardId = string;

interface CardInfo {
  id: CardId;
  cardName: string;
  imgSrc: string;
  rarity: Rarity;
  expansion: Expansion;
  category: Category;
}

type Pack = CardInfo[];
type PackId = string;

interface PackInfo {
  id: PackId;
  packType: A1PackType;
  imgSrc: string;
}
