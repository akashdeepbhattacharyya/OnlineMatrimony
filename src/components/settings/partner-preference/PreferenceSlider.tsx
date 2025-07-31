import { XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { Slider, SliderValue } from '../../common/Slider';

type Props = {
  title: string;
  maxTitle?: string;
  minTitle?: string;
  sliderValue: SliderValue;
  onValuesChange: (values: SliderValue) => void;
  step: number;
};

export const PreferenceSlider = ({
  title,
  maxTitle,
  minTitle,
  sliderValue,
  onValuesChange,
  step,
}: Props) => {
  return (
    <YStack>
      <Text font="headingLight" size="small">
        {title}
      </Text>
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
      />
    </YStack>
  );
};
