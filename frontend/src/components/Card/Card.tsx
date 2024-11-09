import * as S from './Card.style';

interface Pack {
  cardInfo: CardInfo;
}

export default function Card(props: Pack) {
  const { cardInfo } = props;

  return <img src={cardInfo.imgSrc} css={S.card} />;
}
