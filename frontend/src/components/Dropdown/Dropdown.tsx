import * as S from './Dropdown.style';

import { HTMLProps, ReactNode, useEffect, useState } from 'react';

import COLOR from '../../constant/colors';
import DownArrowSvg from '../svgs/DownArrowSVG';
import UpArrowSvg from '../svgs/UpArrowSvg';

interface DropdownHeaderProps<ValueType extends string | number> {
  onToggle: () => void;
  render?: (value: ValueType) => ReactNode;
  value: ValueType;
  isOpened: boolean;
}

function DropdownHeader<ValueType extends string | number>(
  props: DropdownHeaderProps<ValueType>
) {
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

interface DropdownOptionProps<ValueType extends string | number> {
  value: ValueType;
  selectedValue: ValueType;
  onClick: () => void;
  render?: (value: ValueType) => ReactNode;
}

function DropdownOption<ValueType extends string | number>(
  props: DropdownOptionProps<ValueType>
) {
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

interface DropDownProps<ValueType extends string | number>
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  defaultValue: ValueType;
  values: ValueType[];
  onChange: (value: ValueType) => void;
  render?: (value: ValueType) => ReactNode;
}

export default function Dropdown<ValueType extends string | number>(
  props: DropDownProps<ValueType>
) {
  const { defaultValue, values, onChange, render, ...restProps } = props;
  const [selectedValue, setSelectedValue] = useState<ValueType>(defaultValue);
  const [isOpened, setIsOpened] = useState(false);

  const handleHeaderClick = () => setIsOpened(prev => !prev);

  const handleOptionClick = (value: ValueType) => {
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
