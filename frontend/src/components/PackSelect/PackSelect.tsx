import * as S from './PackSelect.styles';

import { useCallback, useEffect, useState } from 'react';

import { A1_PACK_INFOS } from '../../constant/pack';
import Button from '../Button/Button';
import LeftArrow from '../svgs/LeftArrow';
import Pack from './components/Pack/Pack';
import RightArrow from '../svgs/RightArrow';

interface PackSelectProps {
  startPackType?: A1PackType;
  onSelect: (packtype: A1PackType) => void;
}
const a1PackTypes: A1PackType[] = ['charizard', 'pikachu', 'mewtwo'];

export default function PackSelect(props: PackSelectProps) {
  const { onSelect, startPackType } = props;

  const [packTypeIndex, setPackTypeIndex] = useState(() => {
    if (!startPackType) return 0;
    return a1PackTypes.indexOf(startPackType);
  });

  const moveBeforeIndex = useCallback(() => {
    const beforeIndex =
      (packTypeIndex - 1 + a1PackTypes.length) % a1PackTypes.length;
    setPackTypeIndex(beforeIndex);
  }, [packTypeIndex]);

  const moveNextIndex = useCallback(() => {
    const nextIndex = (packTypeIndex + 1) % a1PackTypes.length;
    setPackTypeIndex(nextIndex);
  }, [packTypeIndex]);

  const nowPackType = a1PackTypes[packTypeIndex];

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
          onSelect(nowPackType);
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [moveBeforeIndex, moveNextIndex, nowPackType, onSelect]);

  return (
    <section css={S.layout}>
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
      <Button onClick={() => onSelect(nowPackType)}>팩 개봉하기</Button>
    </section>
  );
}
