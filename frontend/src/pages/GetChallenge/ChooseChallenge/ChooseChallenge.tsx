import * as S from './ChooseChallenge.style';

import { forwardRef, useState } from 'react';

import { A1_CARD_LIST } from '../../../constant/card';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import ConfirmContent from './ConfirmContent/ConfirmContent';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import Modal from '../../../components/Modal/Modal';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import { useTranslation } from 'react-i18next';

interface ChallengeBoxProps {
  pack: Pack;
  onClick: () => void;
}
function ChallengeBox(props: ChallengeBoxProps) {
  const { pack, onClick } = props;
  return (
    <div css={S.boxContainer} onClick={onClick}>
      <ItemDisplay>
        {pack.map(card => (
          <Card cardInfo={card} key={card.id} />
        ))}
      </ItemDisplay>
    </div>
  );
}

const initPack = A1_CARD_LIST.slice(0, 5);

interface ChooseChallengeProps {
  packs: Pack[];
  onSelect: (pack: Pack) => void;
  refreshPacks: () => void;
}
const ChooseChallenge = forwardRef<HTMLDivElement, ChooseChallengeProps>(
  function ChooseChallenge(props: ChooseChallengeProps, ref) {
    const { t } = useTranslation();
    useBGM('chooseChallenge');
    const { packs, refreshPacks, onSelect } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [nowPack, setNowPack] = useState<Pack>(initPack);

    const handleBoxClick = (pack: Pack) => {
      setNowPack(pack);
      setIsOpen(true);
    };

    const modalConfirm = () => {
      onSelect(nowPack);
      setIsOpen(false);
    };

    return (
      <>
        <div css={S.container} ref={ref}>
          {packs.map((pack, idx) => (
            <ChallengeBox
              pack={pack}
              onClick={() => handleBoxClick(pack)}
              key={idx}
            />
          ))}
          <Button css={S.refreshButton} onClick={refreshPacks}>
            {t('get-challenge.choose-challenge.refresh-list')}
          </Button>
        </div>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <ConfirmContent
              pack={nowPack}
              onClose={() => setIsOpen(false)}
              onConfirm={modalConfirm}
            />
          </Modal>
        )}
      </>
    );
  }
);

export default ChooseChallenge;
