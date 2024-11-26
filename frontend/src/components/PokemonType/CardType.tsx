import * as S from './CardType.styles';

import ColorlessPng from '../../assets/types/colorless.png';
import DarknessPng from '../../assets/types/darkness.png';
import DragonPng from '../../assets/types/dragon.png';
import FightingPng from '../../assets/types/fighting.png';
import FirePng from '../../assets/types/fire.png';
import GrassPng from '../../assets/types/grass.png';
import LightningPng from '../../assets/types/lightning.png';
import MetalPng from '../../assets/types/metal.png';
import PsychicPng from '../../assets/types/psychic.png';
import WaterPng from '../../assets/types/water.png';

interface CardTypeProps {
  pokemonType: PokemonType;
  size?: number;
}

const typeSrcRecord: Record<Exclude<PokemonType, 'nonPokemon'>, string> = {
  Colorless: ColorlessPng,
  Darkness: DarknessPng,
  Dragon: DragonPng,
  Fighting: FightingPng,
  Fire: FirePng,
  Grass: GrassPng,
  Lightning: LightningPng,
  Metal: MetalPng,
  Psychic: PsychicPng,
  Water: WaterPng,
};
export default function PokemonType(props: CardTypeProps) {
  const { pokemonType, size = 15 } = props;

  return (
    <div css={S.container}>
      <img
        css={S.pokemonType(size)}
        src={pokemonType === 'nonPokemon' ? '' : typeSrcRecord[pokemonType]}
      />
    </div>
  );
}
