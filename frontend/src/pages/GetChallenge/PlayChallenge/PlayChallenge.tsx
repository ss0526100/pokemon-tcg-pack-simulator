import * as S from './PlayChallenge.styles';

import { useRef, useState } from 'react';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import FlippingCard from '../../../components/FilppingCard/FlippingCard';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import getRandom from '../../../utils/getRandom';

interface PlayChallengeProps {
  pack: Pack;
  goSelect: () => void;
}

export default function PlayChallenge(props: PlayChallengeProps) {
  const { pack, goSelect } = props;

  const [shuffledPack, setShuffledPack] = useState(() =>
    pack.slice().sort(() => getRandom() - 0.5)
  );
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [getId, setGetId] = useState('');
  const [buttonShown, setButtonShown] = useState(false);

  const isClicked = useRef(false);

  const handleClick = (id: string) => {
    if (isClicked.current) return;
    isClicked.current = true;
    setFlippedIds(prev => prev.concat(id));
    setTimeout(() => {
      setGetId(id);
      setFlippedIds(pack.map(card => card.id));

      setButtonShown(true);
    }, 700);
  };

  const reselect = () => {
    setFlippedIds([]);
    setButtonShown(false);
    setGetId('');
    setTimeout(() => {
      setShuffledPack(() => pack.slice().sort(() => getRandom() - 0.5));
      isClicked.current = false;
    }, 300);
  };

  return (
    <>
      <div css={S.displaySection}>
        <ItemDisplay>
          {shuffledPack.map(card => (
            <div css={S.cardContainer} key={card.id}>
              {getId === card.id && <div css={S.cardTag}>GET!</div>}
              <FlippingCard
                onClick={() => handleClick(card.id)}
                cardInfo={card}
                flipped={!flippedIds.includes(card.id)}
                controlled
              />
            </div>
          ))}
        </ItemDisplay>
      </div>
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
