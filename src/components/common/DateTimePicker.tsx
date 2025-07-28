import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getToken, View, ViewProps, YStack } from 'tamagui';
import { PrimaryButton } from './PrimaryButton';
import { FunctionComponent, useState } from 'react';

type Props = {
  maxDate?: Date;
  minDate?: Date;
  isVisible: boolean;
  mode?: 'date' | 'time';
  onConfirm(date: Date): void;
  onCancel(): void;
  selectedDate?: Date;
} & ViewProps;

export const DateTimePicker = ({
  maxDate = new Date(),
  minDate = new Date(1900, 0, 1),
  isVisible,
  mode = 'date',
  onConfirm,
  onCancel,
  selectedDate = new Date(),
  testID = 'date-time-picker',
  ...props
}: Props) => {
  const [date, setDate] = useState(selectedDate);

  const onChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const cancelButton: FunctionComponent = () => {
    return <></>;
  };

  const confirmButton: FunctionComponent = () => {
    return (
      <YStack padding={'$4'} gap={20} {...props}>
        <PrimaryButton
          theme="primary_button"
          onPress={() => onConfirm(date)}
          title={`Confirm`}
          showArrow={false}
        />
        <PrimaryButton
          theme="secondary_button"
          onPress={onCancel}
          title={`Cancel`}
          showArrow={false}
        />
      </YStack>
    );
  };

  return (
    <View theme={'dark'} {...props}>
      <DateTimePickerModal
        testID={testID}
        maximumDate={maxDate}
        minimumDate={minDate}
        date={date}
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onChange={onChange}
        customCancelButtonIOS={cancelButton}
        customConfirmButtonIOS={confirmButton}
        isDarkModeEnabled={true}
        pickerStyleIOS={{ alignItems: 'center' }}
        textColor={getToken('$color.white')}
        pickerContainerStyleIOS={{
          backgroundColor: getToken('$color.primary'),
          borderRadius: 25,
        }}
      />
    </View>
  );
};
