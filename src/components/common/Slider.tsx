import MultiSlider, {
  MultiSliderProps,
} from '@ptomasroos/react-native-multi-slider';
import { Dimensions } from 'react-native';
import { getToken, View } from 'tamagui';

export type SliderValue = {
  min: number;
  max: number;
};

type Props = {
  onValuesChange: (values: SliderValue) => void;
  sliderValue: SliderValue;
  step: number;
};

export const Slider = ({ onValuesChange, sliderValue, step }: Props) => {
  const { width } = Dimensions.get('window');

  const handleValuesChange = (values: number[]) => {
    onValuesChange({ min: values[0], max: values[1] });
  };

  return (
    <View alignItems="center" width="100%">
      <MultiSlider
        values={[sliderValue.min, sliderValue.max]}
        sliderLength={width - 90}
        onValuesChange={handleValuesChange}
        min={sliderValue.min}
        max={sliderValue.max}
        step={step}
        selectedStyle={{ backgroundColor: getToken('$color.button_bg_red') }}
        unselectedStyle={{ backgroundColor: getToken('$color.gray_lighter') }}
        markerStyle={{
          height: 20,
          width: 20,
          backgroundColor: getToken('$color.button_bg_red'),
          borderWidth: 0,
          borderRadius: 10,
        }}
        pressedMarkerStyle={{
          backgroundColor: getToken('$color.button_bg_red'),
        }}
      />
    </View>
  );
};
