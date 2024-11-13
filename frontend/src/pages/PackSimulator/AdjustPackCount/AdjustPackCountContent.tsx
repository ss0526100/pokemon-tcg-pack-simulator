interface AdjustPackCountContentProps {
  onClose: () => void;
}

import * as S from './AdjustPackCountContent.styles';

import Button from '../../../components/Button/Button';
import ControlledStepper from '../../../components/ControlledStepper/ControlledStepper';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';
import { useTranslation } from 'react-i18next';

const packAdjustCounts = [10, 25, 37, 100];
export default function AdjustPackCountContent(
  props: AdjustPackCountContentProps
) {
  const { t } = useTranslation();
  const { onClose } = props;
  const [packCount, setPackCount] = usePackCount();

  return (
    <section css={S.content}>
      <ControlledStepper
        min={10}
        max={100}
        count={packCount}
        onChange={setPackCount}
      />

      <div css={S.recommendCountContainer}>
        {packAdjustCounts.map(cnt => (
          <Button
            key={cnt}
            css={S.recommendButton}
            secondary
            primary={packCount === cnt}
            onClick={() => {
              setPackCount(cnt);
            }}
          >
            {cnt}
          </Button>
        ))}
      </div>
      <Button primary onClick={onClose}>
        {t('pack-simulator.adjust-pack-count-content.confirm')}
      </Button>
    </section>
  );
}
