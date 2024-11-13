interface AdjustPackCountContentProps {
  onClose: () => void;
}

import * as S from './AdjustPackCountContent.styles';

import BottomButtonContainer from '../../../components/BottomButtonContainer/BottomButtonContainer';
import Button from '../../../components/Button/Button';
import ControlledStepper from '../../../components/ControlledStepper/ControlledStepper';
import { useState } from 'react';

export default function AdjustPackCountContent(
  props: AdjustPackCountContentProps
) {
  const { onClose } = props;
  const [count, setCount] = useState(0);

  return (
    <section css={S.content}>
      <ControlledStepper count={count} onChange={setCount} />
      <BottomButtonContainer direction='row'>
        <Button secondary onClick={onClose}>
          취소
        </Button>
        <Button primary onClick={onClose}>
          설정 완료
        </Button>
      </BottomButtonContainer>
    </section>
  );
}
