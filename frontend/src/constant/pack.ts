import EN_A1_CHARIZARD from '../assets/packs/A1/en/A1-CHARIZARD.webp';
import EN_A1_MEWTWO from '../assets/packs/A1/en/A1-MEWTWO.webp';
import EN_A1_PIKACHU from '../assets/packs/A1/en/A1-PIKACHU.webp';
import JA_A1_CHARIZARD from '../assets/packs/A1/ja/A1-CHARIZARD.webp';
import JA_A1_MEWTWO from '../assets/packs/A1/ja/A1-MEWTWO.webp';
import JA_A1_PIKACHU from '../assets/packs/A1/ja/A1-PIKACHU.webp';
import KO_A1_CHARIZARD from '../assets/packs/A1/ko/A1-CHARIZARD.webp';
import KO_A1_MEWTWO from '../assets/packs/A1/ko/A1-MEWTWO.webp';
import KO_A1_PIKACHU from '../assets/packs/A1/ko/A1-PIKACHU.webp';

export const A1_CHARIZARD_PACK: PackInfo = {
  id: 'A1-CHARIZARD',
  packType: 'charizard',
  imgSrc: {
    'ko-KR': KO_A1_CHARIZARD,
    ko: KO_A1_CHARIZARD,
    'en-US': EN_A1_CHARIZARD,
    en: EN_A1_CHARIZARD,
    'ja-JP': JA_A1_CHARIZARD,
    ja: JA_A1_CHARIZARD,
    default: EN_A1_CHARIZARD,
  },
};

export const A1_PIKACHU_PACK: PackInfo = {
  id: 'A1-PIKACHU',
  packType: 'pikachu',
  imgSrc: {
    'ko-KR': KO_A1_PIKACHU,
    ko: KO_A1_PIKACHU,
    'en-US': EN_A1_PIKACHU,
    en: EN_A1_PIKACHU,
    'ja-JP': JA_A1_PIKACHU,
    ja: JA_A1_PIKACHU,
    default: EN_A1_PIKACHU,
  },
};

export const A1_MEWTWO_PACK: PackInfo = {
  id: 'A1-MEWTWO',
  packType: 'mewtwo',
  imgSrc: {
    'ko-KR': KO_A1_MEWTWO,
    ko: KO_A1_MEWTWO,
    'en-US': EN_A1_MEWTWO,
    en: EN_A1_MEWTWO,
    'ja-JP': JA_A1_MEWTWO,
    ja: JA_A1_MEWTWO,
    default: EN_A1_MEWTWO,
  },
};

export const A1_PACK_INFOS: Record<A1PackType, PackInfo> = {
  charizard: A1_CHARIZARD_PACK,
  pikachu: A1_PIKACHU_PACK,
  mewtwo: A1_MEWTWO_PACK,
};
