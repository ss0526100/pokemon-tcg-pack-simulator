import * as S from './PackOpen.styles';

import { useCallback, useEffect } from 'react';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import LeftArrowSvg from '../../../components/svgs/LeftArrowSvg';
import Rarity from '../../../components/Rarity/Rarity';
import RightArrowSvg from '../../../components/svgs/RightArrowSvg';
import i18n from '../../../locales/i18n';
import usePackCount from '../../../hooks/atoms/packs/usePackCount';
import usePacksIndex from './usePacksIndex';
import { useTranslation } from 'react-i18next';

interface PackOpenProps {
  packs: Pack[];
  goOpen: () => void;
  goSelect: () => void;
  nowPackType: PackType;
  isOnePack: boolean;
}

const packMapper: Record<PackType, string> = {
  charizard: i18n.t('constant.pack.a1.charizard'),
  pikachu: i18n.t('constant.pack.a1.pikachu'),
  mewtwo: i18n.t('constant.pack.a1.mewtwo'),
};

const getPackSpacing = (language: Language) => {
  const hasSpace = language === 'en' || language === 'en-US';
  return hasSpace ? ' ' : '';
};

const getPackUnit = (language: Language, count: number) => {
  const isPack = language !== 'en' && language !== 'en-US';
  if (isPack) return i18n.t('constant.unit.pack');
  return count === 1
    ? i18n.t('constant.unit.pack')
    : i18n.t('constant.unit.packs');
};
export default function PackOpen(props: PackOpenProps) {
  const { t } = useTranslation();
  const { packs, goOpen, goSelect, nowPackType, isOnePack } = props;

  const {
    cardLength,
    cardIndex,
    isFirstCard,
    isLastCard,
    nowCard,
    setBeforeCard,
    setNextCard,
    countLeftCards,
    initPackIndex,
  } = usePacksIndex(packs);

  const packCount = usePackCount()[0];

  const reopen = useCallback(() => {
    if (!isLastCard) return;
    countLeftCards();
    initPackIndex();
    goOpen();
  }, [isLastCard, countLeftCards, initPackIndex, goOpen]);

  const handleGoSelect = useCallback(() => {
    countLeftCards();
    initPackIndex();
    goSelect();
  }, [countLeftCards, initPackIndex, goSelect]);

  const language = i18n.language as Language | 'ja' | 'ja-JP';

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          setBeforeCard();
          break;
        case 'ArrowRight':
          setNextCard();
          break;
        case ' ':
          setNextCard();
          if (cardIndex === cardLength) reopen();
          break;
        case 'r':
        case 'ㄱ':
          handleGoSelect();
          break;
        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    cardIndex,
    packs,
    cardLength,
    setBeforeCard,
    setNextCard,
    handleGoSelect,
    reopen,
  ]);
  return (
    <section css={S.layout}>
      <div css={S.sectionContainer}>
        <div css={S.selectContainer} onClick={setBeforeCard}>
          {!isFirstCard && (
            <div css={S.svgContainer}>
              <LeftArrowSvg size={30} />
            </div>
          )}
        </div>
        <div css={S.cardContainer}>
          <Card cardInfo={nowCard} onClick={setNextCard} />
        </div>
        <div css={S.selectContainer} onClick={setNextCard}>
          {!isLastCard && (
            <div css={S.svgContainer}>
              <RightArrowSvg size={30} />
            </div>
          )}
        </div>
      </div>
      {`(${cardIndex}/${cardLength})`}

      <div css={S.rarityContainer}>
        <Rarity rarity={nowCard.rarity} size={30} />
      </div>

      <BottomButtonContainer direction='column'>
        {isLastCard && isOnePack && (
          <Button css={S.buttonAnimation} primary onClick={reopen}>
            {t('pack-simulator.open-pack.reopen')}
            {`\n(${packMapper[nowPackType]} 1${getPackSpacing(
              language
            )}${getPackUnit(language, 1)})`}
          </Button>
        )}
        {isLastCard && !isOnePack && (
          <Button css={S.buttonAnimation} primary onClick={reopen}>
            {t('pack-simulator.open-pack.reopen')}
            {`\n(${packMapper[nowPackType]} ${packCount}${getPackSpacing(
              language
            )} + ${getPackUnit(language, packCount)}
            })`}
          </Button>
        )}
        <Button
          css={S.buttonAnimation}
          secondary
          onClick={handleGoSelect}
          key={'selectButton'}
        >
          {t('pack-simulator.open-pack.choose-pack')}
        </Button>
      </BottomButtonContainer>
    </section>
  );
}
