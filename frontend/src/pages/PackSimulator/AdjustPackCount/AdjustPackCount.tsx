import AdjustPackCountContent from './AdjustPackCountContent';
import COLOR from '../../../constant/colors';
import Modal from '../../../components/Modal/Modal';
import PlusMinusSvg from '../../../components/svgs/PlusMinusSvg';
import ToolbarItem from '../../../components/ToolbarItem/ToolbarItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AdjustPackCount() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <AdjustPackCountContent onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <ToolbarItem
        svg={<PlusMinusSvg fill={COLOR.PRIMARY_COLOR} size={35} />}
        description={
          <>
            {t(`pack-simulator.toolbar.adjust-pack-count-1`)}
            <br />
            {t(`pack-simulator.toolbar.adjust-pack-count-2`)}
          </>
        }
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
}
