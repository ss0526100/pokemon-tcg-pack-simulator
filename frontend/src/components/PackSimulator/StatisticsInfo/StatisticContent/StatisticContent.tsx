import * as S from './StatisticContent.style';

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
    <>
      <span css={S.title}> 통계</span>
      <ul css={S.itemContainer}>
        <StatisticItem title='개봉한 팩' content={packCount} />
        <StatisticItem title='얻은 카드' content={cardCount} />
        <StatisticItem title='crown' content={crownCnt} />
        <StatisticItem title='s3' content={s3Cnt} />
        <StatisticItem title='s2' content={s2Cnt} />
        <StatisticItem title='s1' content={s1Cnt} />
        <StatisticItem title='r4' content={r4Cnt} />
        <StatisticItem title='r3' content={r3Cnt} />
        <StatisticItem title='r2' content={r2Cnt} />
        <StatisticItem title='r1' content={r1Cnt} />
      </ul>
    </>
  );
}
