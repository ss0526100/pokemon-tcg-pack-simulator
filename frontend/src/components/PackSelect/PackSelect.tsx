import * as S from './PackSelect.styles';

import { A1_PACK_INFOS } from '../../constant/pack';
import Button from '../button/button';
import LeftArrow from '../svgs/LeftArrow';
import Pack from './components/Pack/Pack';
import RightArrow from '../svgs/RightArrow';
import { useState } from 'react';

interface PackSelectProps {
  onSelect: (packtype: A1PackType) => void;
}
const a1PackTypes: A1PackType[] = ['charizard', 'pikachu', 'mewtwo'];

export default function PackSelect(props: PackSelectProps) {
  const { onSelect } = props;

  const [packTypeIndex, setPackTypeIndex] = useState(0);
  const beforeIndex =
    (packTypeIndex - 1 + a1PackTypes.length) % a1PackTypes.length;
  const nextIndex = (packTypeIndex + 1) % a1PackTypes.length;

  const nowPackType = a1PackTypes[packTypeIndex];

  return (
    <section css={S.layout}>
      <div css={S.cardContainer}>
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <LeftArrow
              size={30}
              onClick={() => setPackTypeIndex(beforeIndex)}
            />
          </div>
        </div>
        <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
        <div css={S.selectContainer}>
          <div css={S.svgContainer}>
            <RightArrow size={30} onClick={() => setPackTypeIndex(nextIndex)} />
          </div>
        </div>
      </div>
      <Button onClick={() => onSelect(nowPackType)}>팩 개봉하기</Button>
    </section>
  );
}
