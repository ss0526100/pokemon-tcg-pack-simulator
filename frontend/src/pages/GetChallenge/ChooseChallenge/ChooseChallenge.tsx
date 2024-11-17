import * as S from './ChooseChallenge.style';

import { forwardRef, useState } from 'react';

import { A1_CARD_LIST } from '../../../constant/card';
import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import Card from '../../../components/Card/Card';
import ConfirmContent from './ConfirmContent/ConfirmContent';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import MobileTopRightHamburger from '../../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '../../../components/Modal/Modal';
import PokeBallSvg from '../../../components/svgs/PokeBallSvg';
import StatisticContent from '../../PackSimulator/StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import i18n from '../../../locales/i18n';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import { useNavigate } from 'react-router-dom';
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

type ModalContent = 'Statistics' | 'ChallengeConfirm';
const ChooseChallenge = forwardRef<HTMLDivElement, ChooseChallengeProps>(
  function ChooseChallenge(props: ChooseChallengeProps, ref) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useBGM('chooseChallenge');
    const { packs, refreshPacks, onSelect } = props;
    const [nowPack, setNowPack] = useState<Pack>(initPack);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] =
      useState<ModalContent>('Statistics');

    const handleBoxClick = (pack: Pack) => {
      setNowPack(pack);
      setModalContent('ChallengeConfirm');
      setIsModalOpen(true);
    };

    const modalConfirm = () => {
      onSelect(nowPack);
      setIsModalOpen(false);
    };

    return (
      <>
        <MobileTopRightHamburger>
          <MobileTopRightHamburger.Option
            icon={<StatisticsSvg fill={COLOR.PRIMARY_COLOR} size={15} />}
            description={t('toolbar.statistic')}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent('Statistics');
            }}
          />
          <MobileTopRightHamburger.Option
            icon={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={25} />}
            description={t('pack-simulator.toolbar.go-get-challenge')}
            onClick={() => navigate('/')}
          />
        </MobileTopRightHamburger>
        <div css={S.container} ref={ref}>
          {packs.map((pack, idx) => (
            <ChallengeBox
              pack={pack}
              onClick={() => handleBoxClick(pack)}
              key={idx}
            />
          ))}
          <Button css={S.refreshButton} onClick={refreshPacks}>
            {/* 일본어때문에 join */}
            {t('get-challenge.choose-challenge.refresh-list')
              .split(' ')
              .join(
                i18n.language === 'ja' || i18n.language === 'ja-JP' ? '' : ' '
              )}
          </Button>
        </div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {modalContent === 'Statistics' && (
              <StatisticContent onClose={() => setIsModalOpen(false)} />
            )}
            {modalContent === 'ChallengeConfirm' && (
              <ConfirmContent
                pack={nowPack}
                onClose={() => setIsModalOpen(false)}
                onConfirm={modalConfirm}
              />
            )}
          </Modal>
        )}
      </>
    );
  }
);

export default ChooseChallenge;
