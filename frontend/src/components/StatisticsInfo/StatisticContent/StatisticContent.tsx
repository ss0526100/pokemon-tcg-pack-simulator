import * as S from './StatisticContent.style';

import Button from '../../Button/Button';
import Rarity from '../../Rarity/Rarity';
import StatisticItem from './StatisticItem';

interface StatisticContentProps {
  packCount: number;
  cardCount: number;
  rareCntMap: Map<RareGrade, number>;
}

export default function StatisticContent(props: StatisticContentProps) {
  const { packCount, cardCount, rareCntMap } = props;

  const crownCnt = rareCntMap.get('crown') || 0;
  const s3Cnt = rareCntMap.get('s3') || 0;
  const s2Cnt = rareCntMap.get('s2') || 0;
  const s1Cnt = rareCntMap.get('s1') || 0;
  const r4Cnt = rareCntMap.get('r4') || 0;
  const r3Cnt = rareCntMap.get('r3') || 0;
  const r2Cnt = rareCntMap.get('r2') || 0;
  const r1Cnt = rareCntMap.get('r1') || 0;

  return (
    <div css={S.container}>
      <span css={S.title}> 통계</span>
      <ul css={S.itemContainer}>
        <StatisticItem title='개봉한 팩' content={packCount} />
        <StatisticItem title='얻은 카드' content={cardCount} />
        <StatisticItem title={<Rarity cardRare='crown' />} content={crownCnt} />
        <StatisticItem title={<Rarity cardRare='s3' />} content={s3Cnt} />
        <StatisticItem title={<Rarity cardRare='s2' />} content={s2Cnt} />
        <StatisticItem title={<Rarity cardRare='s1' />} content={s1Cnt} />
        <StatisticItem title={<Rarity cardRare='r4' />} content={r4Cnt} />
        <StatisticItem title={<Rarity cardRare='r3' />} content={r3Cnt} />
        <StatisticItem title={<Rarity cardRare='r2' />} content={r2Cnt} />
        <StatisticItem title={<Rarity cardRare='r1' />} content={r1Cnt} />
      </ul>
      <div css={S.buttonContainer}>
        <Button secondary css={S.button}>
          기록 초기화
        </Button>
        <Button css={S.button}>닫기</Button>
      </div>
    </div>
  );
}
