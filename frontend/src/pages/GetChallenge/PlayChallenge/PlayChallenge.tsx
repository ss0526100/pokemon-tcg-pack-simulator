import * as S from './PlayChallenge.styles';

import { useRef, useState } from 'react';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import FlippingCard from '../../../components/FilppingCard/FlippingCard';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import getRandom from '../../../utils/getRandom';
import useGetChallengeCnt from '../../../hooks/atoms/packs/useGetChallengeCnt';
import usePackUtil from '../../../hooks/atoms/packs/usePackUtil';

interface PlayChallengeProps {
  pack: Pack;
  goSelect: () => void;
}

export default function PlayChallenge(props: PlayChallengeProps) {
  const { pack, goSelect } = props;

  const [shuffledPack, setShuffledPack] = useState(() =>
    pack.slice().sort(() => getRandom() - 0.5)
  );

  // id로 관리시 같은 카드가 중복으로 오면 한 카드 선택시 여러개 돌아감
  const [flippedIndex, setFlippedIndex] = useState<number[]>([]);
  const [getIndex, setGetIndex] = useState(-1);
  const [buttonShown, setButtonShown] = useState(false);
  const { countCard } = usePackUtil();

  const setGetChallengeCnt = useGetChallengeCnt()[1];

  const isClicked = useRef(false);

  const handleClick = (index: number) => {
    if (isClicked.current) return;
    countCard(pack[index]);
    setGetChallengeCnt(prev => prev + 1);
    isClicked.current = true;
    setFlippedIndex(prev => prev.concat(index));
    setTimeout(() => {
      setGetIndex(index);
      setFlippedIndex(prev => prev.concat(0, 1, 2, 3, 4));

      setButtonShown(true);
    }, 700);
  };

  const reselect = () => {
    setFlippedIndex([]);
    setButtonShown(false);
    setGetIndex(-1);
    setTimeout(() => {
      setShuffledPack(() => pack.slice().sort(() => getRandom() - 0.5));
      isClicked.current = false;
    }, 300);
  };

  return (
    <>
      <div css={S.displaySection}>
        <ItemDisplay>
          {shuffledPack.map((card, idx) => (
            <div css={S.cardContainer} key={card.id}>
              {idx === getIndex && <div css={S.cardTag}>GET!</div>}
              <FlippingCard
                onClick={() => handleClick(idx)}
                cardInfo={card}
                flipped={!flippedIndex.includes(idx)}
                controlled
              />
            </div>
          ))}
        </ItemDisplay>
      </div>
      {!buttonShown && (
        <BottomButtonContainer>
          <Button secondary css={S.buttonAnimation} onClick={goSelect}>
            다른 챌린지 선택하기
          </Button>
        </BottomButtonContainer>
      )}
      {buttonShown && (
        <BottomButtonContainer>
          <Button onClick={reselect} css={S.buttonAnimation}>
            다시 뽑기
          </Button>
          <Button secondary css={S.buttonAnimation} onClick={goSelect}>
            챌린지 선택하기
          </Button>
        </BottomButtonContainer>
      )}
    </>
  );
}
