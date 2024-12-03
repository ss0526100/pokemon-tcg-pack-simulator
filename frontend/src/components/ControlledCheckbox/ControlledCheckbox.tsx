import CheckboxSvg from '@_components/svgs/CheckBoxSvg';
import EmptyCheckboxSvg from '@_components/svgs/EmptyCheckBox';
import { SVGProps } from 'react';

interface ControlledCheckboxProps extends SVGProps<SVGSVGElement> {
  checked: boolean;
  size?: number;
  fill?: string;
}

export default function ControlledCheckbox(props: ControlledCheckboxProps) {
  const { checked, ...restProps } = props;
  if (checked) return <CheckboxSvg {...restProps} />;
  return <EmptyCheckboxSvg {...restProps} />;
}
