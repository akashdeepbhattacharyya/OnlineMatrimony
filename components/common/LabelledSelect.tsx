import { YStack } from 'tamagui';
import { Text } from './Text';
import { SelectButton } from './SelectButton';
import { Option } from '@/resources/form';

type Props<T> = {
  label: string;
  title: string;
  icon: React.ReactNode;
  value?: string;
  options: Option<T>[];
  selected?: T;
  disabled?: boolean;
  onChange: (selected: T) => void;
};

export const LabelledSelect = <T,>({
  label,
  title,
  icon,
  value,
  options,
  selected,
  onChange,
  disabled = false,
}: Props<T>) => {
  return (
    <YStack width={'100%'} theme="input" gap={'$2.5'}>
      <Text size="normal" font="heading" color={'$background'}>
        {label}
      </Text>
      <SelectButton
        title={title}
        icon={icon}
        value={value}
        options={options}
        selected={selected}
        onChange={onChange}
        theme="select_light_mode"
        paddingHorizontal={'$6'}
        paddingVertical={'$4.5'}
        borderRadius={'$10'}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
      />
    </YStack>
  );
};
