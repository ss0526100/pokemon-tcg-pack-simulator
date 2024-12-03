import * as S from './PackSelect.styles';

import { useCallback, useEffect, useState } from 'react';

import { A1_PACK_INFOS } from '@_constant/pack';
import AdjustPackCountContent from '../AdjustPackCount/AdjustPackCountContent';
import BGMSvg from '@_components/SoundSvg/SoundSvg';
import BottomButtonContainer from '@_components/BottomButtonContainer/BottomButtonContainer';
import Button from '@_components/Button/Button';
import COLOR from '@_constant/colors';
import CollectionContent from '@_pages/CollectionContent/CollectionContent';
import ControlledCheckbox from '@_components/ControlledCheckbox/ControlledCheckbox';
import LeftArrowSvg from '@_components/svgs/LeftArrowSvg';
import MobileTopRightHamburger from '@_components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '@_components/Modal/Modal';
import Pack from './components/Pack/Pack';
import PlusMinusSvg from '@_components/svgs/PlusMinusSvg';
import PokeBallSvg from '@_components/svgs/PokeBallSvg';
import RightArrowSvg from '@_components/svgs/RightArrowSvg';
import SixPacksSvg from '@_components/svgs/SixPacksSvg';
import StatisticContent from '../StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '@_components/svgs/StatisticsSvg';
import SwipeXDetector from '@_components/SwipeXDetector/SwipeXDetector';
import i18n from '@_locales/i18n';
import useBGM from '@_hooks/atoms/bgm/useBGM';
import useBGMUtils from '@_hooks/atoms/bgm/useBGMUtils';
import { useNavigate } from 'react-router-dom';
import usePackCount from '@_hooks/atoms/packs/usePackCount';
import usePackOpenOneTime from '@_hooks/atoms/packs/usePackOpenOneTime';
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

  useBGM('packSelect');
  const { playBGM, toggleBGM, isPlayingBGM } = useBGMUtils();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>('Statistics');
  const [isCollectionContentViewed, setIsCollectionContentViewed] =
    useState(false);
  const [packOpenOneTime, setPackOpenOneTime] = usePackOpenOneTime();

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
        <MobileTopRightHamburger.Line />{' '}
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

        {isCollectionContentViewed && (
          <CollectionContent
            onClose={() => setIsCollectionContentViewed(false)}
          />
        )}
      </MobileTopRightHamburger.OptionPlace>
      <div css={S.contentContainer}>
        <div css={S.selectContainer} onClick={moveBeforeIndex}>
          <div css={S.svgContainer}>
            <LeftArrowSvg size={30} />
          </div>
        </div>
        <SwipeXDetector
          direction='both'
          onLeftDetect={moveBeforeIndex}
          onRightDetect={moveNextIndex}
          css={S.packContainer}
        >
          <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
        </SwipeXDetector>
        <div css={S.selectContainer} onClick={moveNextIndex}>
          <div css={S.svgContainer}>
            <RightArrowSvg size={30} />
          </div>
        </div>
        <div
          css={S.checkboxContainer}
          onClick={() => setPackOpenOneTime(prev => !prev)}
        >
          <ControlledCheckbox
            checked={packOpenOneTime}
            fill={COLOR.PRIMARY_COLOR}
            css={S.checkbox}
            size={30}
          />
          {t('pack-simulator.select-pack.open-one-time')}
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
    </>
  );
}
