type RareGrade = 'crown' | 's3' | 's2' | 's1' | 'r4' | 'r3' | 'r2' | 'r1';

type Expansion = 'A1' | 'Promo';

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

interface Card {
  id: string | number;
  cardName: string;
  imgSrc: string;
  grade: RareGrade;
  expansion: Expansion;
  category: Category;
}
