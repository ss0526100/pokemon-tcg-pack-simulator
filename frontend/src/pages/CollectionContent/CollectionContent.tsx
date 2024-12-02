import * as S from './CollectionContent.style';

import {
  A1_CARD_ID_MAP,
  A1_CROWN_CARD_COUNT,
  A1_RARITY_CARD_COUNT,
  A1_STAR_CARD_COUNT,
  MISSING_NO_CARD,
} from '../../server/constants/cards/a1';
import SortingCircle, {
  SortOrder,
  SortStandard,
} from './SortingCircle/SortingCircle';
import {
  useCrownIdSet,
  useRarityIdSet,
  useStarIdSet,
} from '../../hooks/atoms/packs/useRaritySet';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Rarity from '../../components/Rarity/Rarity';
import useCardIdCntMap from '../../hooks/atoms/packs/useCardCollections';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import Dropdown from '../../components/Dropdown/Dropdown';
// import PokemonType from '../../components/PokemonType/CardType';

interface CollectionContentProps {
  onClose: () => void;
}

export default function CollectionContent(props: CollectionContentProps) {
  const { t } = useTranslation();
  const { onClose } = props;
  const cardIdCntMap = useCardIdCntMap()[0];
  const [raritySet] = useRarityIdSet();
  const [starSet] = useStarIdSet();
  const [crownSet] = useCrownIdSet();
  const [isCardDetailViewed, setIsCardDetailViewed] = useState(false);
  // const [targetRarity, setTargetRarity] = useState<SelectType<Rarity>>('All');
  // const [targetPokemonType, setTargetPokemonType] =
  //   useState<SelectType<PokemonType>>('All');
  const [sortStandard, setSortStandard] = useState<SortStandard>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [cardId, setCardId] = useState('');
  return (
    <>
      <div css={S.layout}>
        <div css={S.title}>{t('toolbar.card-list')}</div>
        <div css={S.selectRow}>
          <div css={S.selectItem}>
            <div css={S.rarityContainer}>
              <Rarity rarity='r1' />
            </div>
            <span
              css={S.selectSpan}
            >{`${raritySet.size}/${A1_RARITY_CARD_COUNT}`}</span>
          </div>
          <div css={S.selectItem}>
            <div css={S.rarityContainer}>
              <Rarity rarity='s1' />
            </div>
            <span
              css={S.selectSpan}
            >{`${starSet.size}/${A1_STAR_CARD_COUNT}`}</span>
          </div>
          <div css={S.selectItem}>
            <div css={S.rarityContainer}>
              <Rarity rarity='crown' size={13} />
            </div>
            <span
              css={S.selectSpan}
            >{`${crownSet.size}/${A1_CROWN_CARD_COUNT}`}</span>
          </div>
        </div>
        {/* <div css={S.dropdownRow}>
          <Dropdown
            defaultValue={'All'}
            values={
              [
                'All',
                'crown',
                's3',
                's2',
                's1',
                'r4',
                'r3',
                'r2',
                'r1',
              ] as SelectType<Rarity>[]
            }
            render={rarity =>
              rarity === 'All' ? (
                t('modal.collection.entire-rarity')
              ) : (
                <Rarity rarity={rarity} />
              )
            }
            onChange={rarity => setTargetRarity(rarity)}
          />
          <Dropdown
            defaultValue={'All'}
            values={
              [
                'All',
                'Grass',
                'Fire',
                'Water',
                'Lightning',
                'Psychic',
                'Fighting',
                'Darkness',
                'Metal',
                'Dragon',
                'Colorless',
              ] as SelectType<PokemonType>[]
            }
            render={type =>
              type === 'All' ? (
                t('modal.collection.entire-type')
              ) : (
                <PokemonType pokemonType={type} />
              )
            }
            onChange={type => setTargetPokemonType(type)}
          />
        </div> */}

        {/* <div css={S.selectRow}>
          <div>타입</div>
          <div>등급</div>
          <div>미보유</div>
        </div> */}
        {cardIdCntMap.size === 0 && (
          <span css={S.emptyCardFallback}>{t('modal.collection.no-card')}</span>
        )}

        {cardIdCntMap.size > 0 && (
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

            <SortingCircle
              standard={sortStandard}
              order={sortOrder}
              changeStandard={setSortStandard}
              changeOrder={setSortOrder}
            />
          </ul>
        )}
        <div css={S.bottomButtonContainer}>
          <Button secondary onClick={onClose}>
            {t('modal.confirm')}
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
              {t('modal.confirm')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
