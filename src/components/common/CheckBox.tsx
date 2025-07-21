import { getToken, View, type ViewProps } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  size?: number;
  testID?: string;
  selected: boolean;
  enabled: boolean;
} & ViewProps;

export const CheckBox = ({
  size = 20,
  testID = 'check-box',
  selected,
  enabled = true,
  ...props
}: Props) => {
  return (
    <View
      theme="checkbox"
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {selected ? (
        <MaterialIcons
          name="check-box"
          size={size}
          color={getToken('$color.button_bg_red')}
        />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={size}
          color={enabled ? getToken('$color.white') : getToken('$color.gray')}
        />
      )}
    </View>
  );
};
