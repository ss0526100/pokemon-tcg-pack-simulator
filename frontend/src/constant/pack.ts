import A1_CHARIZARD from '../assets/packs/A1/A1-CHARIZARD.jpg';
import A1_MEWTWO from '../assets/packs/A1/A1-MEWTWO.jpg';
import A1_PIKACHU from '../assets/packs/A1/A1-PIKACHU.jpg';

export const A1_CHARIZARD_PACK: PackInfo = {
  id: 'A1-CHARIZARD',
  packType: 'charizard',
  imgSrc: A1_CHARIZARD,
};

export const A1_PIKACHU_PACK: PackInfo = {
  id: 'A1-PIKACHU',
  packType: 'pikachu',
  imgSrc: A1_PIKACHU,
};

export const A1_MEWTWO_PACK: PackInfo = {
  id: 'A1-MEWTWO',
  packType: 'mewtwo',
  imgSrc: A1_MEWTWO,
};

export const A1_PACK_INFOS: Record<A1PackType, PackInfo> = {
  charizard: A1_CHARIZARD_PACK,
  pikachu: A1_PIKACHU_PACK,
  mewtwo: A1_MEWTWO_PACK,
};
