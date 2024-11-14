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
import { useTranslation } from 'react-i18next';

interface PackSelectProps {
  startPackType?: PackType;
  onSelect: (packtype: PackType, count: number) => void;
}
const packTypes: PackType[] = ['charizard', 'pikachu', 'mewtwo'];

export default function PackSelect(props: PackSelectProps) {
  const { t } = useTranslation();
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
      <div css={S.cardContainer}>
        <div css={S.selectContainer} onClick={moveBeforeIndex}>
          <div css={S.svgContainer}>
            <LeftArrowSvg size={30} />
          </div>
        </div>
        <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
        <div css={S.selectContainer} onClick={moveNextIndex}>
          <div css={S.svgContainer}>
            <RightArrowSvg size={30} />
          </div>
        </div>
      </div>
      <BottomButtonContainer direction='row'>
        <Button css={S.button} onClick={() => onSelect(nowPackType, packCount)}>
          {(i18n.language === 'ko' || i18n.language === 'ko-KR') &&
            packCount + t('pack-simulator.select-pack.open-pack')}
          {!(i18n.language === 'ko' || i18n.language === 'ko-KR') &&
            t('pack-simulator.select-pack.open-pack') +
              ` ${packCount} ` +
              t('constant.unit.packs')}
        </Button>
        <Button css={S.button} onClick={() => onSelect(nowPackType, 1)}>
          {(i18n.language === 'ko' || i18n.language === 'ko-KR') &&
            ' 1' + t('pack-simulator.select-pack.open-pack')}
          {!(i18n.language === 'ko' || i18n.language === 'ko-KR') &&
            t('pack-simulator.select-pack.open-pack') +
              ' 1 ' +
              t('constant.unit.pack')}
        </Button>
      </BottomButtonContainer>
    </>
  );
}
