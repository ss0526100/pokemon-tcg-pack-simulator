import AdjustPackCountContent from './AdjustPackCountContent';
import COLOR from '../../../constant/colors';
import Modal from '../../../components/Modal/Modal';
import PlusMinusSvg from '../../../components/svgs/PlusMinusSvg';
import ToolbarItem from '../../../components/ToolbarItem/ToolbarItem';
import { useState } from 'react';

export default function AdjustPackCount() {
  const [isModalOpen, setIsModalOpen] = useState(true);
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
            팩 개봉
            <br />
            수량 변경
          </>
        }
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
}
