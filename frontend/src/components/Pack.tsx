interface Pack {
  packInfo: PackInfo;
}

export default function Pack(props: Pack) {
  const { packInfo } = props;

  return <img src={packInfo.imgSrc} />;
}

// const [phase, setPhase] = useState<Phase>('start');
//   const [cardIndex, setCardIndex] = useState(0);
//   const goOpen = useCallback(() => {
//     if (phase === 'start') setPhase('open');
//   }, [phase]);

//   const goNextCard = useCallback(() => {
//     if (phase !== 'open') return;

//     setCardIndex(prevIndex => {
//       if (prevIndex === cardList.length - 1) {
//         setPhase('end');
//         return prevIndex;
//       }
//       return prevIndex + 1;
//     });
//   }, [phase, cardList]);
