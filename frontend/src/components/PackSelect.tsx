import { A1_PACK_INFOS } from '../constant/pack';
import Pack from './Pack';
import { useState } from 'react';

interface PackSelectProps {
  onSelect: (packtype: A1PackType) => void;
}
const a1PackTypes: A1PackType[] = ['charizard', 'pikachu', 'mewtwo'];
const mapper: Record<A1PackType, string> = {
  charizard: '리자몽',
  pikachu: '피카츄',
  mewtwo: '뮤츠',
};

export default function PackSelect(props: PackSelectProps) {
  const { onSelect } = props;

  const [packTypeIndex, setPackTypeIndex] = useState(0);
  const beforeIndex =
    (packTypeIndex - 1 + a1PackTypes.length) % a1PackTypes.length;
  const nextIndex = (packTypeIndex + 1) % a1PackTypes.length;

  const beforePackType = a1PackTypes[beforeIndex];
  const nowPackType = a1PackTypes[packTypeIndex];
  const nextPackType = a1PackTypes[nextIndex];

  return (
    <>
      <button onClick={() => setPackTypeIndex(beforeIndex)}>
        {' '}
        {`${mapper[beforePackType]} 팩 보기`}
      </button>
      <Pack packInfo={A1_PACK_INFOS[nowPackType]} />
      <button onClick={() => onSelect(nowPackType)}> 팩 까러 가기</button>
      <button onClick={() => setPackTypeIndex(nextIndex)}>
        {`${mapper[nextPackType]} 팩 보기`}
      </button>
    </>
  );
}
