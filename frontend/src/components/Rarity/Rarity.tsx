import * as S from './Rarity.styles';

import crown from '../../assets/rarity/crown.png';
import rarity from '../../assets/rarity/rarity.png';
import star from '../../assets/rarity/star.png';

interface RarityProps {
  cardRare: RareGrade;
  size?: number;
}

export default function Rarity(props: RarityProps) {
  const { cardRare, size = 15 } = props;

  switch (cardRare) {
    case 'crown':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={crown} alt='왕관' />
        </div>
      );
    case 's3':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={star} alt='별' />
          <img css={S.rarity(size)} src={star} alt='별' />
          <img css={S.rarity(size)} src={star} alt='별' />
        </div>
      );
    case 's2':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={star} alt='별' />
          <img css={S.rarity(size)} src={star} alt='별' />
        </div>
      );
    case 's1':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={star} alt='별' />
        </div>
      );

    case 'r4':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
        </div>
      );

    case 'r3':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
        </div>
      );

    case 'r2':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
        </div>
      );

    case 'r1':
      return (
        <div css={S.rarityContainer}>
          <img css={S.rarity(size)} src={rarity} alt='다이아' />
        </div>
      );
  }
}
