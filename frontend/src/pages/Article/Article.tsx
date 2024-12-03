import * as S from './Article.style';

import Button from '@_components/Button/Button';
import getMobileOperatingSystem from '@_utils/getMobilOperatingSystem';
import { useTranslation } from 'react-i18next';

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

export default function Article() {
  const { t } = useTranslation();
  const FormURL = t('link.issue-form');
  const goForm = () => {
    window.open(FormURL);
  };
  return (
    <div css={S.layout}>
      <Button secondary onClick={goMarket}>
        {t(`article.install-button`)}
      </Button>
      <Button secondary onClick={goForm}>
        {t(`article.report-button`)}
      </Button>
      <span css={S.span}>
        {t(`article.span-1`)}
        <br /> {t(`article.span-2`)}
        <br />
        <br />
        {t(`article.span-3`)}
        <br />
        {t(`article.span-4`)}
        <br />
        <br />
        {t(`article.span-5`)}
        <br />
        {t(`article.span-6`)}
      </span>
    </div>
  );
}
