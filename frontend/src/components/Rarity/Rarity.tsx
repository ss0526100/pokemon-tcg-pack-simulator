import * as S from './Rarity.styles';

import crownImg from '../../assets/rarity/crown.png';
import rarityImg from '../../assets/rarity/rarity.png';
import starImg from '../../assets/rarity/star.png';

interface RarityProps {
  rarity: Rarity;
  size?: number;
}

export default function Rarity(props: RarityProps) {
  const { rarity, size = 15 } = props;

  switch (rarity) {
    case 'crown':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={crownImg} alt='왕관' />
        </div>
      );

    case 's3':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={starImg} alt='별' />
          <img css={S.rarity(size)} src={starImg} alt='별' />
          <img css={S.rarity(size)} src={starImg} alt='별' />
        </div>
      );

    case 's2':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={starImg} alt='별' />
          <img css={S.rarity(size)} src={starImg} alt='별' />
        </div>
      );

    case 's1':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={starImg} alt='별' />
        </div>
      );

    case 'r4':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
        </div>
      );

    case 'r3':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
        </div>
      );

    case 'r2':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
        </div>
      );

    case 'r1':
      return (
        <div css={S.container}>
          <img css={S.rarity(size)} src={rarityImg} alt='다이아' />
        </div>
      );
  }
}
