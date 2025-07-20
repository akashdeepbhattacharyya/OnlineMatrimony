import { getToken, View, type ViewProps } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  size?: number;
  testID?: string;
  isSelected: boolean;
  onSelect: (status: boolean) => void;
} & ViewProps;

export const CheckBox = ({
  size = 20,
  testID = 'check-button',
  isSelected,
  onSelect,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      aria-label={props['aria-label']}
      testID={testID}
      aria-selected={isSelected}
      onPress={() => {
        onSelect(!isSelected);
      }}
    >
      <View
        theme="checkbox"
        width={size}
        height={size}
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {isSelected ? (
          <MaterialIcons
            name="check-box"
            size={size}
            color={getToken('$color.white')}
          />
        ) : (
          <MaterialIcons
            name="check-box-outline-blank"
            size={size}
            color={getToken('$color.white')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
