import Modal from '../../../components/Modal/Modal';
import StatisticContent from './StatisticContent/StatisticContent';
import Statistics from '../../../components/svgs/Statistics';
import ToolbarItem from '../../../components/ToolbarItem/ToolbarItem';
import { useState } from 'react';

export default function StatisticsInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <StatisticContent onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <ToolbarItem
        svg={<Statistics fill='#3de086' size={35} />}
        description='통계'
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
}
