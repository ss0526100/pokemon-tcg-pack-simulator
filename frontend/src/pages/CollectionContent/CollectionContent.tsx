import * as S from './CollectionContent.style';

import {
  A1_CARD_ID_MAP,
  A1_CROWN_CARD_COUNT,
  A1_RARITY_CARD_COUNT,
  A1_STAR_CARD_COUNT,
  MISSING_NO_CARD,
} from '@_server/constants/cards/a1';
import SortingCircle, {
  SortOrder,
  SortStandard,
} from './SortingCircle/SortingCircle';
import {
  useCrownIdSet,
  useRarityIdSet,
  useStarIdSet,
} from '@_hooks/atoms/packs/useRaritySet';

import Button from '@_components/Button/Button';
import Card from '@_components/Card/Card';
import Dropdown from '@_components/Dropdown/Dropdown';
import PokemonType from '@_components/PokemonType/CardType';
import Rarity from '@_components/Rarity/Rarity';
import getCard from '@_server/apis/getCard';
import useCardIdCntMap from '@_hooks/atoms/packs/useCardCollections';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CollectionContentProps {
  onClose: () => void;
}

const typeOrderRecord: Record<PokemonType, number> = {
  Grass: 0,
  Fire: 1,
  Water: 2,
  Lightning: 3,
  Psychic: 4,
  Fighting: 5,
  Darkness: 6,
  Metal: 7,
  Dragon: 8,
  Colorless: 9,
  nonPokemon: 10,
};

const rarityOrder: Record<Rarity, number> = {
  crown: 0,
  s3: 1,
  s2: 2,
  s1: 3,
  r4: 4,
  r3: 5,
  r2: 6,
  r1: 7,
};

const filterCard = (
  idList: string[],
  type: SelectType<PokemonType>,
  rarity: SelectType<Rarity>,
  standard: SortStandard,
  order: SortOrder
) => {
  const typeFilteredList = idList.filter(id => {
    const card = getCard(id);
    return type === 'All' || card.type === type;
  });

  const finalFilteredCard = typeFilteredList.filter(id => {
    const card = getCard(id);
    return rarity === 'All' || card?.rarity === rarity;
  });

  const nowFlag = order === 'asc' ? 1 : -1;

  if (standard === 'id') {
    return finalFilteredCard.sort(
      (a, b) => nowFlag * getCard(a).id.localeCompare(getCard(b).id)
    );
  }

  if (standard === 'type') {
    return finalFilteredCard.sort(
      (a, b) =>
        nowFlag *
        (typeOrderRecord[getCard(a).type] - typeOrderRecord[getCard(b).type])
    );
  }

  return finalFilteredCard.sort(
    (a, b) =>
      nowFlag *
      (rarityOrder[getCard(a).rarity] - rarityOrder[getCard(b).rarity])
  );
};

export default function CollectionContent(props: CollectionContentProps) {
  const { t } = useTranslation();
  const { onClose } = props;
  const cardIdCntMap = useCardIdCntMap()[0];
  const [raritySet] = useRarityIdSet();
  const [starSet] = useStarIdSet();
  const [crownSet] = useCrownIdSet();
  const [isCardDetailViewed, setIsCardDetailViewed] = useState(false);
  const [targetRarity, setTargetRarity] = useState<SelectType<Rarity>>('All');
  const [targetPokemonType, setTargetPokemonType] =
    useState<SelectType<PokemonType>>('All');
  const [sortStandard, setSortStandard] = useState<SortStandard>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [cardId, setCardId] = useState('');

  const nowIds = filterCard(
    [...cardIdCntMap.keys()].sort(),
    targetPokemonType,
    targetRarity,
    sortStandard,
    sortOrder
  );
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
        <div css={S.dropdownRow}>
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
                'nonPokemon',
              ] as SelectType<PokemonType>[]
            }
            render={type =>
              type === 'All' ? (
                t('modal.collection.entire-type')
              ) : type === 'nonPokemon' ? (
                t('modal.collection.non-pokemon')
              ) : (
                <PokemonType pokemonType={type} />
              )
            }
            onChange={type => setTargetPokemonType(type)}
          />
        </div>

        {/* <div css={S.selectRow}>
          <div>타입</div>
          <div>등급</div>
          <div>미보유</div>
        </div> */}
        {nowIds.length === 0 && (
          <span css={S.emptyCardFallback}>{t('modal.collection.no-card')}</span>
        )}

        {nowIds.length > 0 && (
          <ul css={S.cardList}>
            {nowIds.map(id => {
              return (
                <li
                  css={S.cardContainer}
                  key={id}
                  onClick={() => {
                    setCardId(id);
                    setIsCardDetailViewed(true);
                  }}
                >
                  <Card
                    cardImageSet={
                      (A1_CARD_ID_MAP.get(id) || MISSING_NO_CARD).imgSrc
                    }
                  />
                  {cardIdCntMap.get(id) && (
                    <div css={S.cardCount}>{cardIdCntMap.get(id) || 0}</div>
                  )}
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
            <Card
              cardImageSet={
                (A1_CARD_ID_MAP.get(cardId) || MISSING_NO_CARD).imgSrc
              }
            />
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
