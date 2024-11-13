import * as S from './ConfirmContent.styles';

import BottomButtonContainer from '../../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../../components/Button/Button';
import Card from '../../../../components/Card/Card';
import ItemDisplay from '../../../../components/ItemDisplay/ItemDisplay';
import { useTranslation } from 'react-i18next';

interface ConfirmContentProps {
  pack: Pack;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmContent(props: ConfirmContentProps) {
  const { t } = useTranslation();
  const { onClose, onConfirm, pack } = props;
  return (
    <>
      <div css={S.confirmContainer}>
        <span css={S.modalTitle}>
          {t('get-challenge.choose-challenge.confirm-content.header')}
        </span>
        <div css={S.displayContainer}>
          <ItemDisplay>
            {pack.map(card => (
              <Card cardInfo={card} key={card.id} />
            ))}
          </ItemDisplay>
        </div>
      </div>

      <BottomButtonContainer direction='row'>
        <Button secondary onClick={onClose}>
          {t('get-challenge.choose-challenge.confirm-content.cancel')}
        </Button>
        <Button onClick={onConfirm}>
          {t('get-challenge.choose-challenge.confirm-content.confirm')}
        </Button>
      </BottomButtonContainer>
    </>
  );
}
