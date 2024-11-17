import * as S from './PackSelect.styles';

import { useCallback, useEffect, useState } from 'react';

import { A1_PACK_INFOS } from '../../../constant/pack';
import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import LeftArrowSvg from '../../../components/svgs/LeftArrowSvg';
import Pack from './components/Pack/Pack';
import RightArrowSvg from '../../../components/svgs/RightArrowSvg';
import i18n from '../../../locales/i18n';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';

interface PackSelectProps {
  startPackType?: PackType;
  onSelect: (packtype: PackType, count: number) => void;
}
const packTypes: PackType[] = ['charizard', 'pikachu', 'mewtwo'] as const;

// TODO: ja, jp-ja 제외하기
// 한국어/일본어는 n팩, 영어는 n packs이 어울림
const getSeveralPackStr = (
  language: Language | 'ja' | 'ja-JP',
  packCount: number
) => {
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

// TODO: ja, jp-ja 제외하기

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

export default function PackSelect(props: PackSelectProps) {
  const { onSelect, startPackType } = props;

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

  // TODO: ja, jp-ja 제외하기
  const language = i18n.language as Language | 'ja' | 'ja-JP';

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
  }, [moveBeforeIndex, moveNextIndex, nowPackType, onSelect, packCount]);

  return (
    <>
      <div css={S.contentContainer}>
        <div css={S.selectContainer} onClick={moveBeforeIndex}>
          <div css={S.svgContainer}>
            <LeftArrowSvg size={30} />
          </div>
        </div>
        <div css={S.packContainer}>
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
    </>
  );
}
