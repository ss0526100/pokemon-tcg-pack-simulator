import * as S from './PackSelect.styles';

import { useCallback, useEffect, useState } from 'react';

import { A1_PACK_INFOS } from '../../../constant/pack';
import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import LeftArrow from '../../../components/svgs/LeftArrow';
import Pack from './components/Pack/Pack';
import RightArrow from '../../../components/svgs/RightArrow';

interface PackSelectProps {
  startPackType?: PackType;
  onSelect: (packtype: PackType, packCount: 1 | 10) => void;
}
const packTypes: PackType[] = ['charizard', 'pikachu', 'mewtwo'];

export default function PackSelect(props: PackSelectProps) {
  const { onSelect, startPackType } = props;

  const [packTypeIndex, setPackTypeIndex] = useState(() => {
    if (!startPackType) return 0;
    return packTypes.indexOf(startPackType);
  });

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
          onSelect(nowPackType, 10);
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [moveBeforeIndex, moveNextIndex, nowPackType, onSelect]);

  return (
    <>
      <div css={S.cardContainer}>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <LeftArrow size={30} onClick={moveBeforeIndex} />
          </div>
        </div>
        <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <RightArrow size={30} onClick={moveNextIndex} />
          </div>
        </div>
      </div>
      <BottomButtonContainer direction='row'>
        <Button css={S.button} onClick={() => onSelect(nowPackType, 10)}>
          10팩 개봉하기
        </Button>
        <Button css={S.button} onClick={() => onSelect(nowPackType, 1)}>
          1팩 개봉하기
        </Button>
      </BottomButtonContainer>
    </>
  );
}
