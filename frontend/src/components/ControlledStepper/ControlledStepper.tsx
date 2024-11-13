import * as S from './ControlledStepper.styles';

import { Dispatch } from 'react';

interface StepperProps {
  min?: number;
  max?: number;
  count: number;
  onChange: Dispatch<React.SetStateAction<number>>;
}

export default function Stepper(props: StepperProps) {
  const { min = 1, max = 99, count = 1, onChange } = props;

  const increaseCount = () => onChange(prev => Math.min(prev + 1, max));

  const decreaseCount = () => onChange(prev => Math.max(prev - 1, min));

  return (
    <div css={S.container}>
      <div css={S.buttonWrapper} onClick={decreaseCount}>
        {min < count && '-'}
      </div>
      <div css={S.counter}>{count}</div>
      <div css={S.buttonWrapper} onClick={increaseCount}>
        {count < max && '+'}
      </div>
    </div>
  );
}
