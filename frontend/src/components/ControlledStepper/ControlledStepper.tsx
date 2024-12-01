import * as S from './ControlledStepper.styles';

import { ChangeEvent, Dispatch, useCallback, useEffect } from 'react';

import COLOR from '../../constant/colors';
import MinusSvg from '../svgs/MinusSvg';
import PlusSvg from '../svgs/PlusSvg';

interface StepperProps {
  min?: number;
  max?: number;
  count: number;
  onChange: Dispatch<React.SetStateAction<number>>;
}

export default function Stepper(props: StepperProps) {
  const { min = 1, max = 99, count = 1, onChange } = props;

  const increaseCount = useCallback(
    () => onChange(prev => Math.min(prev + 1, max)),
    [max, onChange]
  );

  const decreaseCount = useCallback(
    () => onChange(prev => Math.max(prev - 1, min)),
    [min, onChange]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          increaseCount();
          break;
        case 'ArrowDown':
          decreaseCount();
          break;

        default:
          break;
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [decreaseCount, increaseCount]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.currentTarget.value;
    const value = Number(stringValue);
    if (isNaN(value)) return (e.target.value = stringValue);
    if (value < min) {
      onChange(min);
      setTimeout(() => (e.target.value = stringValue), 0);
      return;
    }

    if (value > max) {
      onChange(max);
      setTimeout(() => (e.target.value = stringValue), 0);
      return;
    }
    return onChange(value);
  };

  return (
    <div css={S.container}>
      <div css={S.buttonWrapper} onClick={decreaseCount}>
        {min < count && <MinusSvg fill={COLOR.PRIMARY_COLOR} size={30} />}
      </div>
      <input value={count} css={S.counter} onChange={handleChange} />
      <div css={S.buttonWrapper} onClick={increaseCount}>
        {count < max && <PlusSvg fill={COLOR.PRIMARY_COLOR} size={30} />}
      </div>
    </div>
  );
}
