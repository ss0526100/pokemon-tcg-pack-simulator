import { PropsWithChildren, createContext, useState } from 'react';

interface DropdownContext<T> {
  value: T;
  handleChange: (arg: T) => void;
}
export const DropDownContext = createContext<DropdownContext<string | number>>({
  value: '',
  handleChange: () => {},
});

interface DropdownProviderProps extends PropsWithChildren {
  defaultValue: string | number;
  onChange: (value: string | number) => void;
}
export default function DropdownProvider({
  defaultValue,
  onChange,
  children,
}: DropdownProviderProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (nextValue: string | number) => {
    setValue(nextValue);
    onChange(nextValue);
  };

  return (
    <DropDownContext.Provider value={{ value, handleChange }}>
      {children}
    </DropDownContext.Provider>
  );
}
