import * as S from './ChooseChallenge.style';

import { A1_CARD_LIST } from '../../../constant/card';
import Card from '../../../components/Card/Card';
import ItemDisplay from '../../../ItemDisplay/ItemDisplay';

function ChallengeBox() {
  return (
    <div css={S.boxContainer}>
      <ItemDisplay>
        <Card cardInfo={A1_CARD_LIST[0]} />
        <Card cardInfo={A1_CARD_LIST[100]} />
        <Card cardInfo={A1_CARD_LIST[140]} />
        <Card cardInfo={A1_CARD_LIST[150]} />
        <Card cardInfo={A1_CARD_LIST[150]} />
      </ItemDisplay>
    </div>
  );
}

export default function ChooseChallenge() {
  return (
    <div css={S.container}>
      <ChallengeBox />
      <ChallengeBox />
      <ChallengeBox />
      {/* <ChallengeBox />
      <ChallengeBox /> */}
    </div>
  );
}
