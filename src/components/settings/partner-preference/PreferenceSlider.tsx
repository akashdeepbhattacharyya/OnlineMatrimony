import { XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { Slider, SliderValue } from '../../common/Slider';

type Props = {
  maxTitle?: string;
  minTitle?: string;
  sliderValue: SliderValue;
  onValuesChange: (values: SliderValue) => void;
  max: number;
  min: number;
  step: number;
};

export const PreferenceSlider = ({
  maxTitle,
  minTitle,
  sliderValue,
  onValuesChange,
  max,
  min,
  step,
}: Props) => {
  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginTop={'$2'}
      >
        <Text font="heading" size="normal">
          {minTitle}
        </Text>
        <Text font="heading" size="normal">
          {maxTitle}
        </Text>
      </XStack>
      <Slider
        sliderValue={sliderValue}
        onValuesChange={onValuesChange}
        step={step}
        min={min}
        max={max}
      />
    </YStack>
  );
};
