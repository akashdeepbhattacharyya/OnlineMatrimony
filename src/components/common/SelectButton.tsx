import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { XStack, YStack, ViewProps } from 'tamagui';
import { Option } from '@/src/resources/form';
import ChevronIcon from '@/assets/images/chevron-down.svg';
import { Text } from './Text';
import { Select } from './Select';

type Props<T> = {
  title: string;
  icon?: React.ReactNode;
  value?: string;
  options: Option<T>[];
  selected?: T;
  onChange: (selected: T) => void;
  theme?: 'select_light_mode' | 'select_dark_mode';
} & ViewProps;

export const SelectButton = <T,>({
  title,
  icon,
  value,
  options,
  selected,
  onChange,
  theme = 'select_dark_mode',
  ...props
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selected);

  return (
    <YStack
      theme={theme}
      backgroundColor={'$background'}
      paddingVertical={'$2.5'}
      width={'100%'}
      {...props}
    >
      <TouchableOpacity>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          onPress={() => setOpen(!open)}
          gap={'$4'}
        >
          {icon && icon}
          <Text
            font="heading"
            size="normal"
            color={value ? '$color' : '$placeholder'}
            flex={1}
            numberOfLines={1}
          >
            {value || title}
          </Text>
          <ChevronIcon color="$color" />
        </XStack>
      </TouchableOpacity>
      <Select
        title={title}
        open={open}
        onOpenChange={setOpen}
        options={options}
        onChange={selected => {
          setSelectedItem(selected);
          onChange(selected);
        }}
        selected={selectedItem}
      />
    </YStack>
  );
};
