import * as S from './StatisticsInfo.styles';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import StatisticContent from './StatisticContent/StatisticContent';
import Statistics from '../svgs/Statistics';
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
      <div css={S.container}>
        <div css={S.itemContainer} onClick={() => setIsModalOpen(true)}>
          <Button css={S.button} circle secondary>
            <Statistics fill='#3de086' size={35} />
          </Button>
          통계
        </div>
      </div>
    </>
  );
}
