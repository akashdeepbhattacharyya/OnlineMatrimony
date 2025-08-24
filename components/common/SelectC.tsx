import { ReactNode, useEffect, useState } from 'react';
import type { GetThemeValueForKey, SelectProps, ViewProps } from 'tamagui';
import { Option } from '@/resources/form';
import {
  Adapt,
  getToken,
  Select,
  Sheet,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import CheckIcon from '@/assets/images/check.svg';
import ChevronDownIcon from '@/assets/images/chevron-down.svg';
import { TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { Divider } from './Divider';

type SelectValueProps = {
  fontSize?: GetThemeValueForKey<'fontSize'>;
  backgroundColor?: GetThemeValueForKey<'backgroundColor'>;
  placeholderTextColor?: GetThemeValueForKey<'color'>;
  textColor?: GetThemeValueForKey<'color'>;
};

type Props = {
  options: Option[];
  title: string;
  onChange: (value: string) => void;
  initialValue?: Option;
  testID?: string;
  triggerTestID?: string;
  placeholder?: string;
  triggerProps?: ViewProps;
  selectValueProps?: SelectValueProps;
  contentFullScreen?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  chevronIconColor?: string;
} & SelectProps;

export function SelectC({
  options,
  title,
  onChange,
  testID,
  triggerTestID = 'select-trigger',
  placeholder,
  triggerProps,
  selectValueProps = {
    fontSize: '$nm',
    backgroundColor: getToken('$color.white'),
    placeholderTextColor: getToken('$color.gray'),
    textColor: getToken('$color.black'),
  },
  initialValue,
  contentFullScreen = false,
  disabled,
  icon,
  chevronIconColor = getToken('$color.black'),
  ...props
}: Props) {
  const [value, setValue] = useState(initialValue?.value);

  const onValueChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (options.length === 0) {
      setValue(undefined);
    }
  }, [options]);

  function labelBy(value?: string): string {
    return options.find(option => option.value === value)?.label || '';
  }

  return (
    <Select
      value={value ? value : ''}
      onValueChange={onValueChange}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger
        aria-disabled={disabled}
        disabled={disabled}
        theme="select"
        backgroundColor={getToken('$color.white')}
        opacity={1}
        testID={triggerTestID}
        borderRadius={'$10'}
        paddingHorizontal="$6"
        paddingVertical="$3"
        {...triggerProps}
      >
        <XStack flex={1} alignItems="center" gap={'$4.5'}>
          {icon && <Select.Icon>{icon}</Select.Icon>}
          <Select.Value
            flex={1}
            placeholder={placeholder || 'Select an option'}
            fontSize={selectValueProps.fontSize}
            backgroundColor={selectValueProps.backgroundColor}
            fontFamily="$heading"
            color={
              labelBy(value)
                ? selectValueProps.textColor
                : selectValueProps.placeholderTextColor
            }
          >
            {labelBy(value)}
          </Select.Value>
          <ChevronDownIcon style={{ color: chevronIconColor }} />
        </XStack>
      </Select.Trigger>
      <Adapt platform="touch">
        <Sheet
          modal
          snapPointsMode="fit"
          dismissOnSnapToBottom
          dismissOnOverlayPress={true}
          animationConfig={{
            type: 'spring',
            damping: 30,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Overlay
            fullscreen={contentFullScreen}
            backgroundColor={'black'}
            opacity={0.5}
          />
          <Sheet.Frame
            theme={'select'}
            padding="$2"
            borderTopLeftRadius="$8"
            borderTopRightRadius="$8"
            marginTop="$10"
            elevation={6}
            backgroundColor="$background"
          >
            <Sheet.ScrollView marginBottom="$12">
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.Viewport>
          <YStack marginBottom={'$2'}>
            <Text
              font="heading"
              size="medium"
              padding="$3.5"
              color={getToken('$color.white')}
            >
              {title}
            </Text>
            <Divider width={'91%'} marginHorizontal="$4" />
          </YStack>
          <Select.Group testID={testID} aria-selected={!!value}>
            {options.map((item, i) => {
              return (
                <TouchableOpacity role="button" key={item.value}>
                  <View aria-label={`Selected ${item.label}`}>
                    <Select.Item
                      testID={`option-${i + 1}`}
                      aria-selected={item.value === value}
                      index={i}
                      value={item.value}
                      padding={0}
                      marginVertical="$1"
                      backgroundColor={getToken('$color.primary')}
                    >
                      <Theme
                        name={
                          item.value === value
                            ? 'selected_item'
                            : 'unselected_item'
                        }
                      >
                        <XStack
                          flex={1}
                          alignItems="center"
                          justifyContent="space-between"
                          paddingHorizontal="$4"
                        >
                          <Select.ItemText
                            fontFamily="$heading"
                            fontSize="$sm"
                            color={
                              item.value === value
                                ? getToken('$color.button_bg_red')
                                : getToken('$color.white')
                            }
                          >
                            {item.label}
                          </Select.ItemText>
                          {item.value === value && (
                            <CheckIcon
                              color={getToken('$color.button_bg_red')}
                            />
                          )}
                        </XStack>
                      </Theme>
                    </Select.Item>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}

// export { SelectC as SelectC };
export type { Props as SelectProps };
