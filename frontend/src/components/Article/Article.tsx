import * as S from './Article.style';

import Button from '../Button/Button';
import getMobileOperatingSystem from '../../utils/getMobilOperatingSystem';

const APP_STORE_ID = 6479970832;
const PLAY_STORE_ID = 'jp.pokemon.pokemontcgp';
const goMarket = () => {
  const mobileOS = getMobileOperatingSystem();
  if (mobileOS === 'iOS') {
    window.open(`itms-apps://apps.apple.com/app/id${APP_STORE_ID}`);

    setTimeout(() => {
      window.open(`https://apps.apple.com/app/id${APP_STORE_ID}`);
    }, 500);
    return;
  }
  if (mobileOS === 'Android') {
    // Android
    window.open(`market://details?id=${PLAY_STORE_ID}`);

    setTimeout(() => {
      window.open(
        `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}`
      );
    }, 500);
    return;
  }
  window.open(`https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}`);
};

const FormURL = `https://docs.google.com/forms/d/e/1FAIpQLSeWiHRkQdes_Lzhzf4Nnk1wmJ7xiEaxUwIfWPaIdUk39aYdNg/viewform?usp=sf_link`;
const goForm = () => {
  window.open(FormURL);
};
export default function Article() {
  return (
    <div css={S.layout}>
      <Button secondary onClick={goMarket}>
        포켓몬 카드 게임 Pocket 설치
      </Button>
      <Button secondary onClick={goForm}>
        건의사항/피드백/버그 제보
      </Button>
      <span css={S.span}>
        본 서비스는 순수 팬심으로 만든 서비스이며, 수익을 창출하지 않습니다.
        <br />
        서비스 관련 문의 등의 이유로 연락을 위해서는 devsofa2580@gmail.com을
        활용해주시기 바랍니다.
      </span>
    </div>
  );
}
