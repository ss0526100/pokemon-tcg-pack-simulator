import * as S from './PlayChallenge.styles';

import { useRef, useState } from 'react';

import BGMSvg from '../../../components/SoundSvg/SoundSvg';
import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import CollectionContent from '../../CollectionContent/CollectionContent';
import FlippingCard from '../../../components/FilppingCard/FlippingCard';
import ItemDisplay from '../../../components/ItemDisplay/ItemDisplay';
import MobileTopRightHamburger from '../../../components/MobileTopRightHamburger/MobileTopRightHamburger';
import Modal from '../../../components/Modal/Modal';
import PokeBallSvg from '../../../components/svgs/PokeBallSvg';
import SixPacksSvg from '../../../components/svgs/SixPacksSvg';
import StatisticContent from '../../PackSimulator/StatisticsInfo/StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import { css } from '@emotion/react';
import fisherShuffle from '../../../utils/fisherShuffle';
import useBGM from '../../../hooks/atoms/bgm/useBGM';
import useBGMUtils from '../../../hooks/atoms/bgm/useBGMUtils';
import useGetChallengeCnt from '../../../hooks/atoms/packs/useGetChallengeCnt';
import { useNavigate } from 'react-router-dom';
import usePackUtil from '../../../hooks/atoms/packs/usePackUtil';
import { useTranslation } from 'react-i18next';

interface PlayChallengeProps {
  pack: Pack;
  goSelect: () => void;
}

type ModalContent = 'Statistics';
export default function PlayChallenge(props: PlayChallengeProps) {
  const { pack, goSelect } = props;

  useBGM('playChallenge');
  const { isPlayingBGM, toggleBGM } = useBGMUtils();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [shuffledPack, setShuffledPack] = useState(() =>
    fisherShuffle(pack.slice())
  );

  const [isCollectionContentViewed, setIsCollectionContentViewed] =
    useState(false);

  // id로 관리시 같은 카드가 중복으로 오면 한 카드 선택시 여러개 돌아감
  const [flippedIndex, setFlippedIndex] = useState<number[]>([]);
  const [getIndex, setGetIndex] = useState(-1);
  const [buttonShown, setButtonShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>('Statistics');

  const { countCard } = usePackUtil();

  const setGetChallengeCnt = useGetChallengeCnt()[1];

  const isClicked = useRef(false);

  const handleClick = (index: number) => {
    if (isClicked.current) return;
    countCard(shuffledPack[index]);
    setGetChallengeCnt(prev => prev + 1);
    isClicked.current = true;
    setFlippedIndex(prev => prev.concat(index));

    setTimeout(() => {
      setGetIndex(index);
      setButtonShown(true);
      setFlippedIndex(prev => prev.concat(0, 1, 2, 3, 4));
    }, 500);
  };

  const reselect = () => {
    setFlippedIndex([]);
    setButtonShown(false);
    setGetIndex(-1);
    setTimeout(() => {
      setShuffledPack(() => fisherShuffle(pack.slice()));
      isClicked.current = false;
    }, 300);
  };

  return (
    <>
      <MobileTopRightHamburger>
        <MobileTopRightHamburger.Option
          icon={<SixPacksSvg fill={COLOR.PRIMARY_COLOR} size={18} />}
          description={t('toolbar.card-list')}
          onClick={() => {
            setIsCollectionContentViewed(true);
          }}
        />
        <MobileTopRightHamburger.Option
          icon={<StatisticsSvg fill={COLOR.PRIMARY_COLOR} size={15} />}
          description={t('toolbar.statistic')}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent('Statistics');
          }}
        />
        <MobileTopRightHamburger.Option
          icon={<BGMSvg fill={COLOR.PRIMARY_COLOR} size={20} />}
          description={
            isPlayingBGM ? t('toolbar.sound-off') : t('toolbar.sound-on')
          }
          onClick={e => {
            e.stopPropagation();
            toggleBGM();
          }}
        />
        <MobileTopRightHamburger.Option
          icon={<PokeBallSvg fill={COLOR.PRIMARY_COLOR} size={25} />}
          description={t('pack-simulator.toolbar.go-get-challenge')}
          onClick={() => navigate('/get-challenge')}
        />
      </MobileTopRightHamburger>
      <MobileTopRightHamburger.OptionPlace>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {modalContent === 'Statistics' && (
              <StatisticContent onClose={() => setIsModalOpen(false)} />
            )}
          </Modal>
        )}

        {isCollectionContentViewed && (
          <CollectionContent
            onClose={() => setIsCollectionContentViewed(false)}
          />
        )}
      </MobileTopRightHamburger.OptionPlace>
      <div css={S.displaySection}>
        <ItemDisplay>
          {shuffledPack.map((card, idx) => (
            <div css={S.cardContainer} key={idx}>
              {idx === getIndex && <div css={S.cardTag}>GET!</div>}
              <FlippingCard
                onClick={() => handleClick(idx)}
                cardInfo={card}
                flipped={!flippedIndex.includes(idx)}
                controlled
              />
            </div>
          ))}
        </ItemDisplay>
      </div>

      <BottomButtonContainer css={S.buttonContainer}>
        <Button
          onClick={reselect}
          css={[
            S.buttonAnimation,
            !buttonShown &&
              css`
                visibility: hidden;
              `,
          ]}
        >
          {t('get-challenge.play-challenge.re-unpack')}
        </Button>
        <Button secondary css={S.buttonAnimation} onClick={goSelect}>
          {t('get-challenge.play-challenge.chooseChallenge')}
        </Button>
      </BottomButtonContainer>
    </>
  );
}
