import * as S from './ChooseChallenge.style';

import { forwardRef, useState } from 'react';

import { A1_CARD_LIST } from '../../../server/constants/cards/a1';
import BGMSvg from '../../../components/SoundSvg/SoundSvg';
import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import Card from '../../../components/Card/Card';
import CollectionContent from '../../CollectionContent/CollectionContent';
import ConfirmContent from './ConfirmContent/ConfirmContent';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import MobileTopRightHamburger from '../../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '../../../components/Modal/Modal';
import PokeBallSvg from '../../../components/svgs/PokeBallSvg';
import SixPacksSvg from '../../../components/svgs/SixPacksSvg';
import StatisticContent from '../../PackSimulator/StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import i18n from '../../../locales/i18n';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import useBGMUtils from '../../../hooks/atoms/bgm/useBGMUtils';
import useIsPlayingBGM from '../../../hooks/atoms/bgm/useIsPlayingBGM';
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
    const { toggleBGM } = useBGMUtils();
    const [isPlayingBGM] = useIsPlayingBGM();
    const { packs, refreshPacks, onSelect } = props;
    const [nowPack, setNowPack] = useState<Pack>(initPack);
    const [isCollectionContentViewed, setIsCollectionContentViewed] =
      useState(false);

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
            icon={<SixPacksSvg fill={COLOR.PRIMARY_COLOR} size={18} />}
            description={t('toolbar.card-list')}
            onClick={() => {
              setIsCollectionContentViewed(true);
            }}
          />
          <MobileTopRightHamburger.Option
            icon={<StatisticsSvg fill={COLOR.PRIMARY_COLOR} size={15} />}
            description={t('toolbar.statistic')}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent('Statistics');
            }}
          />
          <MobileTopRightHamburger.Option
            icon={<BGMSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
            description={
              isPlayingBGM ? t('toolbar.sound-off') : t('toolbar.sound-on')
            }
            onClick={e => {
              e.stopPropagation();
              toggleBGM();
            }}
          />
          <MobileTopRightHamburger.Option
            icon={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={25} />}
            description={t('pack-simulator.toolbar.go-get-challenge')}
            onClick={() => navigate('/get-challenge')}
          />
        </MobileTopRightHamburger>
        <MobileTopRightHamburger.OptionPlace>
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

          {isCollectionContentViewed && (
            <CollectionContent
              onClose={() => setIsCollectionContentViewed(false)}
            />
          )}
        </MobileTopRightHamburger.OptionPlace>
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
      </>
    );
  }
);

export default ChooseChallenge;
