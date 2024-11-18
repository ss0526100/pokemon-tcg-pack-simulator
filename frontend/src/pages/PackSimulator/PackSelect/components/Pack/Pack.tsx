import * as S from './Pack.styles';

import { HTMLAttributes } from 'react';
import LANGUAGES from '../../../../../constant/language';
import i18n from '../../../../../locales/i18n';

interface Pack extends HTMLAttributes<HTMLImageElement> {
  packInfo: PackInfo;
}

export default function Pack(props: Pack) {
  const { packInfo, ...restProps } = props;
  const language =
    LANGUAGES.find(language => language === i18n.language) || 'default';

  return <img src={packInfo.imgSrc[language]} css={S.pack} {...restProps} />;
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
