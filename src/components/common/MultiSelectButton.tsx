import { useState } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { getToken, XStack, YStack } from 'tamagui';
import { MultiSelect } from './MultiSelect';
import { PrimaryButton } from './PrimaryButton';
import { Option } from '@/src/resources/form';
import ChevronIcon from '@/assets/images/chevron-down.svg';
import { Text } from './Text';

type Props = {
  title: string;
  options: Option[];
  initialValues?: Option[];
  onChange: (selected: Option[]) => void;
} & ViewProps;

export const MultiSelectButton = ({
  title,
  options,
  initialValues = [],
  onChange,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(initialValues);

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
            {selectedOptions.length > 0
              ? selectedOptions.map(option => option.label).join(', ')
              : title}
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
          setSelectedOptions(selected);
          onChange(selected);
        }}
        selected={selectedOptions}
      />
    </YStack>
  );
};
