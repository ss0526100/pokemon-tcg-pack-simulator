import * as S from './SortingCircle.style';

import { Dispatch, ReactNode, SVGProps, SetStateAction, useState } from 'react';

import Button from '../../../components/Button/Button';
import COLOR from '../../../constant/colors';
import ContentContour from '../../../components/ContentContour/ContentContour';
import DownArrowSolidSvg from '../../../components/svgs/DownSolidArrow';
import HashTagSvg from '../../../components/svgs/HashTagSvg';
import Modal from '../../../components/Modal/Modal';
import RaritySvg from '../../../components/svgs/RaritySvg';
import UpArrowSolidSvg from '../../../components/svgs/UpSolidArrow';
import WrongColorlessTypeSvg from '../../../components/svgs/WrongColorlessTypeSvg';
import i18n from '../../../locales/i18n';

export type SortStandard = 'type' | 'rarity' | 'id';
export type SortOrder = 'asc' | 'desc';

interface SortingCircleProps {
  standard: SortStandard;
  order: SortOrder;
  changeStandard: Dispatch<SetStateAction<SortStandard>>;
  changeOrder: Dispatch<SetStateAction<SortOrder>>;
}

interface SvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

const standardSvgMapper: Record<SortStandard, (props: SvgProps) => ReactNode> =
  {
    id: HashTagSvg,
    rarity: RaritySvg,
    type: WrongColorlessTypeSvg,
  };

const orderSvgMapper: Record<SortOrder, (props: SvgProps) => ReactNode> = {
  desc: DownArrowSolidSvg,
  asc: UpArrowSolidSvg,
};

interface ModalItemProps {
  standard: SortStandard;
  nowStandard: SortStandard;
  order: SortOrder;
  onClick: (standard: SortStandard) => void;
}

const ModalItem = ({
  standard,
  nowStandard,
  order,
  onClick,
}: ModalItemProps) => {
  const StandardSvg = standardSvgMapper[standard];
  const OrderSvg = orderSvgMapper[order];
  const isSelected = standard === nowStandard;
  return (
    <div css={S.modalItem(isSelected)} onClick={() => onClick(standard)}>
      <span>{i18n.t('modal.collection.' + standard + '-standard')}</span>
      <StandardSvg size={20} fill={isSelected ? 'white' : COLOR.MAIN_GRAY} />
      {isSelected && (
        <OrderSvg css={S.modalItemSvg} size={30} fill={COLOR.MAIN_GRAY} />
      )}
    </div>
  );
};

export default function SortingCircle(props: SortingCircleProps) {
  const { standard, order, changeStandard, changeOrder } = props;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const NowStandardSvg = standardSvgMapper[standard];
  const NowOrderSvg = orderSvgMapper[order];

  const handleModalItemClick = (targetStandard: SortStandard) => {
    if (targetStandard === standard) {
      changeOrder(prev => {
        if (prev === 'asc') return 'desc';
        return 'asc';
      });
      setIsModalOpened(false);
      return;
    }

    changeStandard(targetStandard);
    changeOrder('asc');
    setIsModalOpened(false);
  };

  return (
    <>
      {isModalOpened && (
        <Modal position='bottom' onClose={() => setIsModalOpened(false)}>
          <div css={S.modalContent}>
            <div css={S.modalHeader}>정렬</div>
            <ContentContour />
            <div css={S.modalItemContainer}>
              <ModalItem
                standard='id'
                nowStandard={standard}
                order={order}
                onClick={handleModalItemClick}
              />
              <ModalItem
                standard='rarity'
                nowStandard={standard}
                order={order}
                onClick={handleModalItemClick}
              />

              <ModalItem
                standard='type'
                nowStandard={standard}
                order={order}
                onClick={handleModalItemClick}
              />
            </div>
            <Button secondary onClick={() => setIsModalOpened(false)}>
              닫기
            </Button>
          </div>
        </Modal>
      )}
      <div css={S.sortingCircle}>
        <Button
          css={S.sortingButton}
          circle
          secondary
          onClick={() => setIsModalOpened(true)}
        >
          <NowStandardSvg
            css={S.sortingButtonStandard}
            fill={COLOR.PRIMARY_COLOR}
            size={30}
          />
          <NowOrderSvg
            css={S.sortingButtonOrder}
            fill={COLOR.PRIMARY_COLOR}
            size={30}
          />
        </Button>
      </div>
    </>
  );
}
