import * as S from './ChooseChallenge.style';

import { A1_CARD_LIST } from '../../../constant/card';
import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import Modal from '../../../components/Modal/Modal';
import { useState } from 'react';

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

interface ConfirmContent {
  pack: Pack;
  onClose: () => void;
  onConfirm: () => void;
}
function ConfirmContent(props: ConfirmContent) {
  const { onClose, onConfirm, pack } = props;
  return (
    <>
      <div css={S.confirmContainer}>
        <span css={S.modalTitle}>선택하시겠습니까?</span>
        <ItemDisplay>
          {pack.map(card => (
            <Card cardInfo={card} key={card.id} />
          ))}
        </ItemDisplay>
      </div>

      <BottomButtonContainer direction='row'>
        <Button secondary onClick={onClose}>
          취소
        </Button>
        <Button onClick={onConfirm}>확인</Button>
      </BottomButtonContainer>
    </>
  );
}

const initPack = A1_CARD_LIST.slice(0, 5);

interface ChooseChallengeProps {
  packs: Pack[];
  onSelect: (pack: Pack) => void;
}
export default function ChooseChallenge(props: ChooseChallengeProps) {
  const { packs, onSelect } = props;
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
      <div css={S.container}>
        {packs.map((pack, idx) => (
          <ChallengeBox
            pack={pack}
            onClick={() => handleBoxClick(pack)}
            key={idx}
          />
        ))}
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
