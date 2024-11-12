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

const pack = A1_CARD_LIST.slice(0, 5);
const pack1 = A1_CARD_LIST.slice(1, 6);

interface ConfirmContent {
  pack: Pack;
  onClose: () => void;
  onConfirm: () => void;
}
function ConfirmContent(props: ConfirmContent) {
  const { onClose, onConfirm, pack } = props;
  return (
    <>
      <div style={{ height: '40vh', width: '100%', maxWidth: '600px' }}>
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
export default function ChooseChallenge() {
  const [isOpen, setIsOpen] = useState(false);
  const [nowPack, setNowPack] = useState<Pack>(initPack);

  const handleBoxClick = (pack: Pack) => {
    setNowPack(pack);
    setIsOpen(true);
  };

  return (
    <>
      <div css={S.container}>
        <ChallengeBox pack={pack} onClick={() => handleBoxClick(pack)} />
        <ChallengeBox pack={pack1} onClick={() => handleBoxClick(pack1)} />
        <ChallengeBox pack={pack} onClick={() => setIsOpen(true)} />
        <ChallengeBox pack={pack} onClick={() => setIsOpen(true)} />
      </div>
      {isOpen && (
        <Modal position='bottom' onClose={() => setIsOpen(false)}>
          <ConfirmContent
            pack={nowPack}
            onClose={() => setIsOpen(false)}
            onConfirm={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
