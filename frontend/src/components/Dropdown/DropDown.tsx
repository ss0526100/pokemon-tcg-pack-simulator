import { HTMLProps, ReactNode, useEffect, useState } from 'react';

interface DropdownHeaderProps {
  onToggle: () => void;
  render?: (value: string | number) => ReactNode;
  value: string | number;
}

function DropdownHeader(props: DropdownHeaderProps) {
  const { render, onToggle, value } = props;
  if (!render) return <div onClick={onToggle}>{value}</div>;
  return <div onClick={onToggle}>{render(value)}</div>;
}

interface DropdownOptionProps {
  value: string | number;
  selectedValue: string | number;
  onClick: () => void;
  render?: (value: string | number) => ReactNode;
}

function DropdownOption(props: DropdownOptionProps) {
  const { value, render, onClick } = props;
  if (!render) return <div onClick={onClick}>{value}</div>;
  return <div onClick={onClick}>{render(value)}</div>;
}

interface DropDownProps<>extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  defaultValue: string | number;
  values: (string | number)[];
  onChange: (value: string | number) => void;
  render?: (value: string | number) => ReactNode;
}

export default function DropDown(props: DropDownProps) {
  const { defaultValue, values, onChange, render, ...restProps } = props;
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue
  );
  const [isOpened, setIsOpened] = useState(false);

  const handleHeaderClick = () => setIsOpened(prev => !prev);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div {...restProps}>
      <DropdownHeader
        render={render}
        onToggle={handleHeaderClick}
        value={selectedValue}
      />
      {isOpened && (
        <div>
          {values.map((value, idx) => (
            <DropdownOption
              render={render}
              value={value}
              key={idx}
              selectedValue={selectedValue}
              onClick={() => onChange(value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
