import { ViewProps, YStack } from 'tamagui';
import { PreferenceSlider } from './PreferenceSlider';
import { useState } from 'react';
import { SliderValue } from '../../common/Slider';
import { formatFeetInch } from '@/src/utils/utils';

export const PersonalPreference = ({ ...props }: ViewProps) => {
  const [ageRange, setAgeRange] = useState<SliderValue>({ min: 25, max: 50 });
  const [heightRange, setHeightRange] = useState<SliderValue>({
    min: 4.5,
    max: 7.0,
  });

  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$4'}
      backgroundColor={'$background'}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <PreferenceSlider
        title="Age"
        minTitle={`Min ${ageRange.min} Yrs`}
        maxTitle={`Max ${ageRange.max} Yrs`}
        sliderValue={ageRange}
        onValuesChange={setAgeRange}
        step={1}
      />
      <PreferenceSlider
        title="Height"
        minTitle={`Min ${formatFeetInch(heightRange.min)}`}
        maxTitle={`Max ${formatFeetInch(heightRange.max)}`}
        sliderValue={heightRange}
        onValuesChange={setHeightRange}
        step={0.5}
      />
    </YStack>
  );
};
