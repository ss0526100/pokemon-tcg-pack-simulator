import * as S from './StatisticContent.style';

import Button from '../../Button/Button';
import Rarity from '../../Rarity/Rarity';
import StatisticItem from './StatisticItem';
import useCardCount from '../../../hooks/atoms/useCardCount';
import usePackCount from '../../../hooks/atoms/usePackCount';
import useRarityCntMap from '../../../hooks/atoms/useRarityCntMap';

interface StatisticContentProps {
  onClose: () => void;
}
export default function StatisticContent(props: StatisticContentProps) {
  const { onClose } = props;
  const [rarityCntMap, setRarityCntMap] = useRarityCntMap();
  const [packCount, setPackCount] = usePackCount();
  const [cardCount, setCardCount] = useCardCount();

  const crownCnt = rarityCntMap.get('crown') || 0;
  const s3Cnt = rarityCntMap.get('s3') || 0;
  const s2Cnt = rarityCntMap.get('s2') || 0;
  const s1Cnt = rarityCntMap.get('s1') || 0;
  const r4Cnt = rarityCntMap.get('r4') || 0;
  const r3Cnt = rarityCntMap.get('r3') || 0;
  const r2Cnt = rarityCntMap.get('r2') || 0;
  const r1Cnt = rarityCntMap.get('r1') || 0;

  const resetRecord = () => {
    setRarityCntMap(new Map());
    setPackCount(0);
    setCardCount(0);
  };

  return (
    <div css={S.container}>
      <span css={S.title}> 통계</span>
      <ul css={S.itemContainer}>
        <StatisticItem title='개봉한 팩' content={packCount} />
        <StatisticItem title='얻은 카드' content={cardCount} />
        <StatisticItem title={<Rarity rarity='crown' />} content={crownCnt} />
        <StatisticItem title={<Rarity rarity='s3' />} content={s3Cnt} />
        <StatisticItem title={<Rarity rarity='s2' />} content={s2Cnt} />
        <StatisticItem title={<Rarity rarity='s1' />} content={s1Cnt} />
        <StatisticItem title={<Rarity rarity='r4' />} content={r4Cnt} />
        <StatisticItem title={<Rarity rarity='r3' />} content={r3Cnt} />
        <StatisticItem title={<Rarity rarity='r2' />} content={r2Cnt} />
        <StatisticItem title={<Rarity rarity='r1' />} content={r1Cnt} />
      </ul>
      <div css={S.buttonContainer}>
        <Button secondary css={S.button} onClick={resetRecord}>
          기록 초기화
        </Button>
        <Button css={S.button} onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}
