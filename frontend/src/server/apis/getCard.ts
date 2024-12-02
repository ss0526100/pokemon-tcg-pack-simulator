import { A1_CARD_ID_MAP, MISSING_NO_CARD } from '../constants/cards/a1';

export default function getCard(id: string) {
  const nowCard = A1_CARD_ID_MAP.get(id);
  if (!nowCard) return MISSING_NO_CARD;
  return nowCard;
}
