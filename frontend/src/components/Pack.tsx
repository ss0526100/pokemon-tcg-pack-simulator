import { useCallback, useState } from 'react';

interface PackProps {
  cardList: string[];
  onEnd: () => void;
}

type Phase = 'start' | 'open' | 'end';
export default function Pack(props: PackProps) {
  const { cardList, onEnd } = props;

  const [phase, setPhase] = useState<Phase>('start');
  console.log(phase);
  const [cardIndex, setCardIndex] = useState(0);
  const goOpen = useCallback(() => {
    if (phase === 'start') setPhase('open');
  }, [phase]);

  const goNextCard = useCallback(() => {
    if (phase !== 'open') return;

    setCardIndex(prevIndex => {
      if (prevIndex === cardList.length - 1) {
        setPhase('end');
        return prevIndex;
      }
      return prevIndex + 1;
    });
  }, [phase, cardList]);

  return (
    <>
      {phase === 'start' && (
        <button onClick={goOpen} autoFocus>
          팩을 까볼까요?
        </button>
      )}
      {phase === 'open' && (
        <>
          <button onClick={goNextCard} autoFocus>
            {cardList[cardIndex]}
          </button>
        </>
      )}
      {phase === 'end' && (
        <button onClick={onEnd} autoFocus>
          결과 {cardList.join(' ')} 다시 깔까요?
        </button>
      )}
    </>
  );
}
