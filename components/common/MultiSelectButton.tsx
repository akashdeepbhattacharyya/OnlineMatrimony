import { useState } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { getToken, XStack, YStack } from 'tamagui';
import { MultiSelect } from './MultiSelect';
import { PrimaryButton } from './PrimaryButton';
import { Option } from '@/resources/form';
import ChevronIcon from '@/assets/images/chevron-down.svg';
import { Text } from './Text';

type Props<T> = {
  title: string;
  value?: string;
  options: Option<T>[];
  selected?: T[];
  onChange: (selected: T[]) => void;
} & ViewProps;

export const MultiSelectButton = <T,>({
  title,
  value,
  options,
  selected = [],
  onChange,
  ...props
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>(selected);

  return (
    <YStack {...props} paddingVertical={'$2.5'} width={'100%'}>
      <TouchableOpacity>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          onPress={() => setOpen(!open)}
          gap={'$4'}
        >
          <Text font="heading" size="normal" flex={1}>
            {value || title}
          </Text>
          <ChevronIcon color={getToken('$color.white')} />
        </XStack>
      </TouchableOpacity>
      <MultiSelect
        title={title}
        open={open}
        onOpenChange={setOpen}
        options={options}
        onChange={selected => {
          setSelectedItems(selected);
          onChange(selected);
        }}
        selected={selectedItems}
      />
    </YStack>
  );
};
