import { HTMLProps, ReactNode, useEffect, useState } from 'react';
import * as S from './Dropdown.style';
import UpArrowSvg from '../svgs/UpArrowSvg';
import DownArrowSvg from '../svgs/DownArrowSVG';
import COLOR from '../../constant/colors';
interface DropdownHeaderProps {
  onToggle: () => void;
  render?: (value: string | number) => ReactNode;
  value: string | number;
  isOpened: boolean;
}

function DropdownHeader(props: DropdownHeaderProps) {
  const { render, onToggle, value, isOpened } = props;

  return (
    <div css={S.header} onClick={onToggle}>
      <div css={S.headerValue}>{render ? render(value) : value}</div>
      {isOpened ? (
        <UpArrowSvg fill={COLOR.MAIN_GRAY} size={20} />
      ) : (
        <DownArrowSvg fill={COLOR.MAIN_GRAY} size={20} />
      )}
    </div>
  );
}

interface DropdownOptionProps {
  value: string | number;
  selectedValue: string | number;
  onClick: () => void;
  render?: (value: string | number) => ReactNode;
}

function DropdownOption(props: DropdownOptionProps) {
  const { value, selectedValue, render, onClick } = props;
  const isSelected = selectedValue === value;
  if (!render)
    return (
      <div css={S.option(isSelected)} onClick={onClick}>
        {value}
      </div>
    );
  return (
    <div css={S.option(isSelected)} onClick={onClick}>
      {render(value)}
    </div>
  );
}

interface DropDownProps<>extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  defaultValue: string | number;
  values: (string | number)[];
  onChange: (value: string | number) => void;
  render?: (value: string | number) => ReactNode;
}

export default function Dropdown(props: DropDownProps) {
  const { defaultValue, values, onChange, render, ...restProps } = props;
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue
  );
  const [isOpened, setIsOpened] = useState(false);

  const handleHeaderClick = () => setIsOpened(prev => !prev);

  const handleOptionClick = (value: string | number) => {
    onChange(value);
    setSelectedValue(value);
    setIsOpened(false);
  };

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div css={S.dropdown} {...restProps}>
      <DropdownHeader
        render={render}
        onToggle={handleHeaderClick}
        value={selectedValue}
        isOpened={isOpened}
      />
      {isOpened && (
        <>
          <div css={S.dimmer} onClick={handleHeaderClick} />
          <div css={S.optionContainer}>
            {values.map((value, idx) => (
              <DropdownOption
                render={render}
                value={value}
                key={idx}
                selectedValue={selectedValue}
                onClick={() => handleOptionClick(value)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
