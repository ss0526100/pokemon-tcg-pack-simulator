import * as S from './CollectionContent.style';

import {
  A1_CARD_ID_MAP,
  MISSING_NO_CARD,
} from '../../server/constants/cards/a1';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import useCardIdCntMap from '../../hooks/atoms/packs/useCardCollections';
import { useState } from 'react';

interface CollectionContentProps {
  onClose: () => void;
}

export default function CollectionContent(props: CollectionContentProps) {
  const { onClose } = props;
  const cardIdCntMap = useCardIdCntMap()[0];
  const [isCardDetailViewed, setIsCardDetailViewed] = useState(false);
  const [cardId, setCardId] = useState('');
  return (
    <>
      <div></div>
      <div css={S.layout}>
        <div css={S.title}>카드 목록</div>
        <ul css={S.cardList}>
          {[...cardIdCntMap].sort().map(([id, value]) => {
            return (
              <li
                css={S.cardContainer}
                key={id}
                onClick={() => {
                  setCardId(id);
                  setIsCardDetailViewed(true);
                }}
              >
                <Card cardInfo={A1_CARD_ID_MAP.get(id) || MISSING_NO_CARD} />
                <div css={S.cardCount}>{value}</div>
              </li>
            );
          })}
        </ul>
        <div css={S.bottomButtonContainer}>
          <Button secondary onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
      {isCardDetailViewed && (
        <div css={S.layout}>
          <div css={S.cardDetailCardContainer}>
            <Card cardInfo={A1_CARD_ID_MAP.get(cardId) || MISSING_NO_CARD} />
          </div>
          <div css={S.bottomButtonContainer}>
            <Button
              onClick={() => {
                setIsCardDetailViewed(false);
              }}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
