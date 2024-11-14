import COLOR from '../../../constant/colors';
import Modal from '../../../components/Modal/Modal';
import StatisticContent from './StatisticContent/StatisticContent';
import StatisticsSvg from '../../../components/svgs/StatisticsSvg';
import ToolbarItem from '../../../components/ToolbarItem/ToolbarItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function StatisticsInfo() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <StatisticContent onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <ToolbarItem
        svg={<StatisticsSvg fill={COLOR.PRIMARY_COLOR} size={35} />}
        description={t('toolbar.statistic')}
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
}
