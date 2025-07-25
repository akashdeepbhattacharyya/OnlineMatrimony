import { ReactNode, useEffect, useState } from 'react';
import type { SelectProps, ViewProps } from 'tamagui';
import { Option } from '@/src/resources/form';
import {
  Adapt,
  getToken,
  H1,
  Select,
  Separator,
  Sheet,
  Theme,
  View,
  XStack,
} from 'tamagui';
import CheckIcon from '@/assets/images/check.svg';
import ChevronDownIcon from '@/assets/images/chevron-down.svg';
import { TouchableOpacity } from 'react-native';

type Props = {
  options: Option[];
  title: string;
  onChange: (value: string) => void;
  initialValue?: Option;
  testID?: string;
  triggerTestID?: string;
  placeholder?: string;
  triggerProps?: ViewProps;
  contentFullScreen?: boolean;
  // renderSelectedValue?: (value?: string) => ReactNode;
  disabled?: boolean;
} & SelectProps;

export function SelectC({
  options,
  title,
  onChange,
  testID,
  triggerTestID = 'select-trigger',
  placeholder,
  triggerProps,
  initialValue,
  contentFullScreen = false,
  // renderSelectedValue,
  disabled,
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

  // function labelBy(value?: string): string {
  //   return options.find(option => option.value === value)?.label || '';
  // }

  // const selectValueContent = () => {
  //   return renderSelectedValue && value ? (
  //     renderSelectedValue(value)
  //   ) : (
  //     <Select.Value
  //       flex={1}
  //       fontSize="$nm"
  //       paddingVertical="$2"
  //       placeholder={placeholder || 'Select an option'}
  //     >
  //       {labelBy(value)}
  //     </Select.Value>
  //   );
  // };

  return (
    <Select
      value={value ? value : ''}
      onValueChange={onValueChange}
      disablePreventBodyScroll
      // {...props}
    >
      <Select.Trigger
        aria-disabled={disabled}
        disabled={disabled}
        theme="input"
        borderColor="$borderColor"
        testID={triggerTestID}
        // {...triggerProps}
      >
        <XStack flex={1} alignItems="center">
          {/* {selectValueContent()} */}
          <ChevronDownIcon />
        </XStack>
      </Select.Trigger>
      {/* <Adapt platform="touch">
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
            padding="$4"
            borderTopLeftRadius="$12"
            borderTopRightRadius="$12"
            marginTop="$20"
            elevation={6}
            backgroundColor="$background"
          >
            <Sheet.ScrollView marginTop="$4" marginBottom="$20">
              <Adapt.Contents backgroundColor="green" />
            </Sheet.ScrollView>
          </Sheet.Frame>
        </Sheet>
      </Adapt> */}
      {/* <Select.Content zIndex={200000}>
        <Select.Viewport>
          <H1 marginVertical="$3" paddingHorizontal="$3.5">
            {title}
          </H1>
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
                      marginVertical="$2"
                      borderRadius="$5"
                    >
                      <Theme
                        name={item.value === value ? 'selectedItem' : null}
                      >
                        <XStack
                          flex={1}
                          backgroundColor="$background"
                          alignItems="center"
                          justifyContent="space-between"
                          paddingVertical="$3"
                          paddingHorizontal="$4"
                        >
                          <Select.ItemText
                            fontFamily="$heading"
                            fontSize="$xl"
                            color="$color.primary"
                          >
                            {item.label}
                          </Select.ItemText>
                          {item.value === value && (
                            <CheckIcon
                              // style={{
                              //   color: getToken("$color.primary_light"),
                              // }}
                              color={getToken('$color.button_bg_red')}
                            />
                          )}
                        </XStack>
                      </Theme>
                    </Select.Item>
                    {i < options.length - 1 && <Separator />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content> */}
    </Select>
  );
}

export { SelectC as Select };
