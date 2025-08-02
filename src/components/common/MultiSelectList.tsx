import { Option } from '@/src/resources/form';
import { useState } from 'react';
import { YStack, XStack, ViewProps } from 'tamagui';
import { Text } from './Text';
import { Divider } from './Divider';
import { CheckBox } from './CheckBox';
import { TouchableOpacity } from 'react-native';

type Props = {
  options: Option[];
  onChange: (selected: Option[]) => void;
  selected?: Option[];
} & ViewProps;

export function MultiSelectList({
  options,
  onChange,
  selected = [],
  ...props
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(selected);

  // console.log('Selected options:', selected);

  const toggleOption = (option: Option) => {
    const options = selectedOptions.includes(option)
      ? selectedOptions.filter(i => i !== option)
      : [...selectedOptions, option];
    setSelectedOptions(options);
    onChange(options);
  };

  return (
    <YStack {...props}>
      {console.log('--------------------------------------')}
      {options.map(
        option => (
          console.log(
            'Rendering option:',
            option.label,
            selectedOptions.includes(option),
          ),
          (
            <YStack key={option.value}>
              <TouchableOpacity onPress={() => toggleOption(option)}>
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical={'$2.5'}
                  paddingTop={'$3.5'}
                >
                  <Text font="heading" size="small">
                    {option.label}
                  </Text>
                  <CheckBox selected={selectedOptions.includes(option)} />
                </XStack>
                <Divider width={'100%'} />
              </TouchableOpacity>
            </YStack>
          )
        ),
      )}
    </YStack>
  );
}
