import * as S from './PackSelect.styles';

import { useCallback, useEffect, useState } from 'react';

import { A1_PACK_INFOS } from '../../../constant/pack';
import AdjustPackCountContent from '../AdjustPackCount/AdjustPackCountContent';
import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import LeftArrowSvg from '../../../components/svgs/LeftArrowSvg';
import MobileTopRightHamburger from '../../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '../../../components/Modal/Modal';
import Pack from './components/Pack/Pack';
import PlusMinusSvg from '../../../components/svgs/PlusMinusSvg';
import PokeBallSvg from '../../../components/svgs/PokeBallSvg';
import RightArrowSvg from '../../../components/svgs/RightArrowSvg';
import SoundSvg from '../../../components/SoundSvg/SoundSvg';
import StatisticContent from '../StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import i18n from '../../../locales/i18n';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import { useNavigate } from 'react-router-dom';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';
import { useTranslation } from 'react-i18next';

interface PackSelectProps {
  startPackType?: PackType;
  onSelect: (packtype: PackType, count: number) => void;
}
const packTypes: PackType[] = ['charizard', 'pikachu', 'mewtwo'] as const;

// 한국어/일본어는 n팩, 영어는 n packs이 어울림
const getSeveralPackStr = (language: Language, packCount: number) => {
  if (language === 'ko' || language === 'ko-KR') {
    return packCount + i18n.t('pack-simulator.select-pack.open-pack');
  }
  if (language === 'en' || language === 'en-US') {
    return (
      i18n.t('pack-simulator.select-pack.open-pack') +
      ` ${packCount} ` +
      i18n.t('constant.unit.packs')
    );
  }
  if (language === 'ja' || language === 'ja-JP') {
    return packCount + i18n.t('pack-simulator.select-pack.open-pack');
  }
  return (
    i18n.t('pack-simulator.select-pack.open-pack') +
    ` ${packCount} ` +
    i18n.t('constant.unit.packsf')
  );
};

// 한국어/일본어는 1팩, 영어는 1 pack이 어울림
const getOnePackStr = (language: Language | 'ja' | 'ja-JP') => {
  if (language === 'ko' || language === 'ko-KR') {
    return 1 + i18n.t('pack-simulator.select-pack.open-pack');
  }
  if (language === 'en' || language === 'en-US') {
    return (
      i18n.t('pack-simulator.select-pack.open-pack') +
      ` a ` +
      i18n.t('constant.unit.pack')
    );
  }
  if (language === 'ja' || language === 'ja-JP') {
    return 1 + i18n.t('pack-simulator.select-pack.open-pack');
  }
  return (
    i18n.t('pack-simulator.select-pack.open-pack') +
    ` a ` +
    i18n.t('constant.unit.pack')
  );
};

type ModalContent = 'Statistics' | 'PackCount';

export default function PackSelect(props: PackSelectProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onSelect, startPackType } = props;

  const { playBGM, toggleBGM, isPlayingBGM } = useBGM('packSelect');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>('Statistics');

  const [packTypeIndex, setPackTypeIndex] = useState(() => {
    if (!startPackType) return 0;
    return packTypes.indexOf(startPackType);
  });

  const [packCount] = usePackCount();

  const moveBeforeIndex = useCallback(() => {
    const beforeIndex =
      (packTypeIndex - 1 + packTypes.length) % packTypes.length;
    setPackTypeIndex(beforeIndex);
  }, [packTypeIndex]);

  const moveNextIndex = useCallback(() => {
    const nextIndex = (packTypeIndex + 1) % packTypes.length;
    setPackTypeIndex(nextIndex);
  }, [packTypeIndex]);

  const nowPackType = packTypes[packTypeIndex];

  const language = i18n.language as Language;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          moveBeforeIndex();
          break;
        case 'ArrowRight':
          moveNextIndex();
          break;
        case ' ':
          onSelect(nowPackType, 1);
          break;
        case 'r':
          onSelect(nowPackType, packCount);
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    moveBeforeIndex,
    moveNextIndex,
    nowPackType,
    onSelect,
    packCount,
    playBGM,
  ]);

  return (
    <>
      <MobileTopRightHamburger>
        <MobileTopRightHamburger.Option
          icon={<PlusMinusSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
          description={
            t('pack-simulator.toolbar.adjust-pack-count-1') +
            t('pack-simulator.toolbar.adjust-pack-count-2')
          }
          onClick={() => {
            setIsModalOpen(true);
            setModalContent('PackCount');
          }}
        />

        <MobileTopRightHamburger.Line />
        <MobileTopRightHamburger.Option
          icon={<SoundSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
          description={isPlayingBGM ? '사운드 끄기' : '사운드 켜기'}
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
      <div css={S.contentContainer}>
        <div css={S.selectContainer} onClick={moveBeforeIndex}>
          <div css={S.svgContainer}>
            <LeftArrowSvg size={30} />
          </div>
        </div>
        <div css={S.packContainer} onClick={() => playBGM()}>
          <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
        </div>
        <div css={S.selectContainer} onClick={moveNextIndex}>
          <div css={S.svgContainer}>
            <RightArrowSvg size={30} />
          </div>
        </div>
      </div>
      <BottomButtonContainer css={S.buttonContainer} direction='row'>
        <Button css={S.button} onClick={() => onSelect(nowPackType, packCount)}>
          {getSeveralPackStr(language, packCount)}
        </Button>
        <Button css={S.button} onClick={() => onSelect(nowPackType, 1)}>
          {getOnePackStr(language)}
        </Button>
      </BottomButtonContainer>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          {modalContent === 'Statistics' && (
            <StatisticContent onClose={() => setIsModalOpen(false)} />
          )}

          {modalContent === 'PackCount' && (
            <AdjustPackCountContent onClose={() => setIsModalOpen(false)} />
          )}
        </Modal>
      )}
    </>
  );
}
