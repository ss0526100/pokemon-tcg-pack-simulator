import DropdownProvider, { DropDownContext } from './DropDownProvider';
import { HTMLProps, ReactNode, useContext, useState } from 'react';

interface DropdownHeaderProps {
  onToggle: () => void;
  render?: (value: string | number) => ReactNode;
}

function DropdownHeader(props: DropdownHeaderProps) {
  const { render, onToggle } = props;
  const { value } = useContext(DropDownContext);
  if (!render) return <div onClick={onToggle}>{value}</div>;
  return <div onClick={onToggle}>{render(value)}</div>;
}

interface DropdownOptionProps {
  value: string | number;
  render?: (value: string | number) => ReactNode;
}

function DropdownOption(props: DropdownOptionProps) {
  const { value, render } = props;
  const { handleChange } = useContext(DropDownContext);
  if (!render) return <div onClick={() => handleChange(value)}>{value}</div>;
  return <div onClick={() => handleChange(value)}>{render(value)}</div>;
}

interface DropDownProps<>extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  defaultValue: string | number;
  values: (string | number)[];
  onChange: (value: string | number) => void;
  render?: (value: string | number) => ReactNode;
}

export default function DropDown(props: DropDownProps) {
  const { defaultValue, values, onChange, render } = props;
  const [isOpened, setIsOpened] = useState(false);

  const handleHeaderClick = () => setIsOpened(prev => !prev);

  return (
    <DropdownProvider defaultValue={defaultValue} onChange={onChange}>
      <div onClick={handleHeaderClick}>
        <DropdownHeader render={render} onToggle={handleHeaderClick} />
      </div>
      {isOpened && (
        <div>
          {values.map((value, idx) => (
            <DropdownOption render={render} value={value} key={idx} />
          ))}
        </div>
      )}
    </DropdownProvider>
  );
}
