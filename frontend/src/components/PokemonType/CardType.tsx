import * as S from './CardType.styles';

import ColorlessPng from '@_assets/types/colorless.png';
import DarknessPng from '@_assets/types/darkness.png';
import DragonPng from '@_assets/types/dragon.png';
import FightingPng from '@_assets/types/fighting.png';
import FirePng from '@_assets/types/fire.png';
import GrassPng from '@_assets/types/grass.png';
import LightningPng from '@_assets/types/lightning.png';
import MetalPng from '@_assets/types/metal.png';
import PsychicPng from '@_assets/types/psychic.png';
import WaterPng from '@_assets/types/water.png';

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
