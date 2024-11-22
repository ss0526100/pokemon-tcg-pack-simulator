import * as S from './PackOpen.styles';

import { useCallback, useEffect, useState } from 'react';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import LeftArrowSvg from '../../../components/svgs/LeftArrowSvg';
import MobileTopRightHamburger from '../../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '../../../components/Modal/Modal';
import OpenedPack from './OpenedPack/OpenedPack';
import PokeBallSvg from '../../../components/svgs/PokeBallSvg';
import Rarity from '../../../components/Rarity/Rarity';
import RightArrowSvg from '../../../components/svgs/RightArrowSvg';
import SoundSvg from '../../../components/SoundSvg/SoundSvg';
import StatisticContent from '../StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import ThreePacksSvg from '../../../components/svgs/ThreePacksSvg';
import i18n from '../../../locales/i18n';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import useBGMUtils from '../../../hooks/atoms/bgm/useBGMUtils';
import useIsPlayingBGM from '../../../hooks/atoms/bgm/useIsPlayingBGM';
import { useNavigate } from 'react-router-dom';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';
import usePacksIndex from './usePacksIndex';
import { useTranslation } from 'react-i18next';

interface PackOpenProps {
  packs: Pack[];
  goOpen: () => void;
  goSelect: () => void;
  nowPackType: PackType;
  isOnePack: boolean;
}

const getPackDescription = (
  language: Language,
  type: PackType,
  count: number
) => {
  const packMapper: Record<PackType, string> = {
    charizard: i18n.t('constant.pack.a1.charizard'),
    pikachu: i18n.t('constant.pack.a1.pikachu'),
    mewtwo: i18n.t('constant.pack.a1.mewtwo'),
  };
  if (language === 'en' || language === 'en-US') {
    if (count === 1)
      return 'A ' + packMapper[type] + ' ' + i18n.t('constant.unit.pack');
    return packMapper[type] + ` ${count} ` + i18n.t('constant.unit.packs');
  }
  return `${packMapper[type]} ${count}${i18n.t('constant.unit.pack')}`;
};

type ModalContent = 'Statistics';

export default function PackOpen(props: PackOpenProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { packs, goOpen, goSelect, nowPackType, isOnePack } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>('Statistics');

  useBGM('packOpen');
  const { toggleBGM } = useBGMUtils();
  const [isPlayingBGM] = useIsPlayingBGM();

  const {
    cardLength,
    cardIndex,
    isFirstCard,
    isLastCard,
    beforeCard,
    nowCard,
    nextCard,
    isEmergingNowCard,
    setBeforeCard,
    setNextCard,
    countLeftCards,
    initPackIndex,
  } = usePacksIndex(packs);

  const packCount = usePackCount()[0];

  const reopen = useCallback(() => {
    if (!isLastCard) return;
    countLeftCards();
    initPackIndex();
    goOpen();
  }, [isLastCard, countLeftCards, initPackIndex, goOpen]);

  const handleGoSelect = useCallback(() => {
    countLeftCards();
    initPackIndex();
    goSelect();
  }, [countLeftCards, initPackIndex, goSelect]);

  const language = i18n.language as Language | 'ja' | 'ja-JP';

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          setBeforeCard();
          break;
        case 'ArrowRight':
          setNextCard();
          break;
        case ' ':
          setNextCard();
          if (cardIndex === cardLength) reopen();
          break;
        case 'r':
        case 'ㄱ':
          handleGoSelect();
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    cardIndex,
    packs,
    cardLength,
    setBeforeCard,
    setNextCard,
    handleGoSelect,
    reopen,
  ]);
  return (
    <section css={S.layout}>
      <MobileTopRightHamburger>
        <MobileTopRightHamburger.Option
          icon={<ThreePacksSvg fill={COLOR.PRIMARY_COLOR} size={17} />}
          description={t('pack-simulator.open-pack.choose-pack')}
          onClick={handleGoSelect}
        />

        <MobileTopRightHamburger.Line />
        <MobileTopRightHamburger.Option
          icon={<SoundSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
          description={
            isPlayingBGM ? t('toolbar.sound-off') : t('toolbar.sound-on')
          }
          onClick={e => {
            e.stopPropagation();
            toggleBGM();
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
          icon={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={25} />}
          description={t('pack-simulator.toolbar.go-get-challenge')}
          onClick={() => navigate('/get-challenge')}
        />
      </MobileTopRightHamburger>
      <div css={S.sectionContainer}>
        <div css={S.selectContainer(!isFirstCard)} onClick={setBeforeCard}>
          {!isFirstCard && (
            <div css={S.svgContainer}>
              <LeftArrowSvg size={30} />
            </div>
          )}
        </div>
        <div css={S.cardInfoContainer}>
          <div css={S.cardContainer}>
            <OpenedPack
              beforeCard={beforeCard}
              nowCard={nowCard}
              nextCard={nextCard}
              isEmergingNowCard={isEmergingNowCard}
              setNextCard={setNextCard}
              setBeforeCard={setBeforeCard}
              nowIndex={cardIndex}
            />
            {/* <Card cardInfo={nowCard} onClick={setNextCard} /> */}
            {/* <MovingCard cardInfo={nowCard} onClick={setNextCard} /> */}
            <div css={S.rarityContainer}>
              <Rarity rarity={nowCard.rarity} size={40} />
            </div>
          </div>
        </div>
        <div css={S.selectContainer(!isLastCard)} onClick={setNextCard}>
          {!isLastCard && (
            <div css={S.svgContainer}>
              <RightArrowSvg size={30} />
            </div>
          )}
        </div>
      </div>

      <BottomButtonContainer direction='row' css={S.mobileBottomFixed}>
        {isLastCard && (
          <Button
            css={S.buttonAnimation}
            onClick={handleGoSelect}
            key={'selectButton'}
          >
            {t('pack-simulator.open-pack.choose-pack')}
          </Button>
        )}
      </BottomButtonContainer>

      <BottomButtonContainer direction='column' css={S.bottomContainer}>
        {isLastCard && (
          <Button css={S.buttonAnimation} primary onClick={reopen}>
            {t('pack-simulator.open-pack.reopen')}
            {` (${getPackDescription(
              language,
              nowPackType,
              isOnePack ? 1 : packCount
            )})`}
          </Button>
        )}
        <Button
          css={S.buttonAnimation}
          secondary
          onClick={handleGoSelect}
          key={'selectButton'}
        >
          {t('pack-simulator.open-pack.choose-pack')}
        </Button>
      </BottomButtonContainer>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalContent === 'Statistics' && (
            <StatisticContent onClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </section>
  );
}
