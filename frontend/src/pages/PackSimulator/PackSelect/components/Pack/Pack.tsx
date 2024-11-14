import * as S from './Pack.styles';

import i18n from '../../../../../locales/i18n';

interface Pack {
  packInfo: PackInfo;
}

export default function Pack(props: Pack) {
  const { packInfo } = props;
  const language = i18n.language as Language;
  return <img src={packInfo.imgSrc[language]} css={S.pack} />;
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
