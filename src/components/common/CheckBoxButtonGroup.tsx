import { Option } from '@/src/resources/form';
import { CheckBoxButton } from './CheckBoxButton';
import { View, type ViewProps } from 'tamagui';

type Props<T> = {
  testID?: string;
  options: Option<T>[];
  onChange: (option: Option<T>) => void;
  selectedOption?: Option<T> | null;
  disabled?: boolean;
} & ViewProps;

export const CheckBoxButtonGroup = <T = string,>({
  testID = 'check-box-button-group',
  options,
  onChange,
  selectedOption,
  disabled,
  ...props
}: Props<T>) => {
  return (
    <View testID={testID} role="radiogroup" {...props}>
      {options.map((item, index) => {
        return (
          <View key={item.label} paddingVertical={'$2'}>
            <CheckBoxButton
              testID={`${'checkbox-button'}-${index + 1}`}
              option={item}
              selected={item.value === selectedOption?.value}
              enabled={selectedOption == undefined}
              disabled={disabled}
              onChange={onChange}
            />
          </View>
        );
      })}
    </View>
  );
};
