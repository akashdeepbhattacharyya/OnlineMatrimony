import { getToken, ViewProps, YStack } from 'tamagui';
import { PreferenceSlider } from './PreferenceSlider';
import { useState } from 'react';
import { SliderValue } from '../../common/Slider';
import { formatFeetInch } from '@/src/utils/utils';
import { PreferenceItem } from './PreferenceItem';
import { Select } from '../../common/Select';
import { MaritalStatus, maritalStatus } from '@/src/resources/update-profile';
import { Option } from '@/src/resources/form';

export const PersonalPreference = ({ ...props }: ViewProps) => {
  const [ageRange, setAgeRange] = useState<SliderValue>({ min: 25, max: 50 });
  const [heightRange, setHeightRange] = useState<SliderValue>({
    min: 4.5,
    max: 7.0,
  });

  const maritalStatusOptions: Option<MaritalStatus>[] = Object.keys(
    maritalStatus,
  ).map(key => ({
    label: maritalStatus[key as keyof typeof maritalStatus],
    value: key as MaritalStatus,
  }));

  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$3'}
      backgroundColor={'$background'}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <PreferenceItem title="Age">
        <PreferenceSlider
          minTitle={`Min ${ageRange.min} Yrs`}
          maxTitle={`Max ${ageRange.max} Yrs`}
          sliderValue={ageRange}
          onValuesChange={setAgeRange}
          step={1}
        />
      </PreferenceItem>
      <PreferenceItem title="Height">
        <PreferenceSlider
          minTitle={`Min ${formatFeetInch(heightRange.min)}`}
          maxTitle={`Max ${formatFeetInch(heightRange.max)}`}
          sliderValue={heightRange}
          onValuesChange={setHeightRange}
          step={0.5}
        />
      </PreferenceItem>
      <PreferenceItem title="Marital Status">
        <Select
          options={maritalStatusOptions}
          placeholder="Select Marital Status"
          onChange={value => console.log('Selected Marital Status:', value)}
          // initialValue={maritalStatusOptions[0]}
          // value={undefined}
          title="Marital Status"
          triggerProps={{
            padding: 0,
            borderRadius: 0,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            marginTop: -5,
          }}
          selectValueProps={{
            fontSize: '$sm',
            backgroundColor: 'transparent',
            placeholderTextColor: getToken('$color.white'),
            textColor: getToken('$color.white'),
          }}
        />
      </PreferenceItem>
    </YStack>
  );
};
