import * as S from './StatisticContent.style';

import Button from '@_components/Button/Button';
import Rarity from '@_components/Rarity/Rarity';
import StatisticItem from './StatisticItem';
import useCardCount from '@_hooks/atoms/packs/useCardCount';
import useGetChallengeCnt from '@_hooks/atoms/packs/useGetChallengeCnt';
import useOpenedPackCount from '@_hooks/atoms/packs/useOpenedPackCount';
import usePackUtil from '@_hooks/atoms/packs/usePackUtil';
import useRarityCntMap from '@_hooks/atoms/packs/useRarityCntMap';
import { useTranslation } from 'react-i18next';

interface StatisticContentProps {
  onClose: () => void;
}
export default function StatisticContent(props: StatisticContentProps) {
  const { t } = useTranslation();
  const { onClose } = props;
  const [rarityCntMap] = useRarityCntMap();
  const [packCount] = useOpenedPackCount();
  const [cardCount] = useCardCount();
  const { resetPack } = usePackUtil();
  const getChallengeCnt = useGetChallengeCnt()[0];

  const crownCnt = rarityCntMap.get('crown') || 0;
  const s3Cnt = rarityCntMap.get('s3') || 0;
  const s2Cnt = rarityCntMap.get('s2') || 0;
  const s1Cnt = rarityCntMap.get('s1') || 0;
  const r4Cnt = rarityCntMap.get('r4') || 0;
  const r3Cnt = rarityCntMap.get('r3') || 0;
  const r2Cnt = rarityCntMap.get('r2') || 0;
  const r1Cnt = rarityCntMap.get('r1') || 0;

  const resetRecord = () => {
    resetPack();
  };

  return (
    <div css={S.container}>
      <span css={S.title}> {t('modal.statistic.title')}</span>
      <ul css={S.itemContainer}>
        <StatisticItem
          title={t('modal.statistic.opened-pack')}
          content={packCount}
        />
        <StatisticItem
          title={t('modal.statistic.get-challenge-cnt')}
          content={getChallengeCnt}
        />
        <StatisticItem
          title={t('modal.statistic.gain-cards')}
          content={cardCount}
        />
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
          {t('modal.statistic.reset')}
        </Button>
        <Button css={S.button} onClick={onClose}>
          {t('modal.statistic.confirm')}
        </Button>
      </div>
    </div>
  );
}
