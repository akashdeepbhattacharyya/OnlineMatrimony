import { Option } from '@/src/resources/form';
import { ViewProps, Sheet, getToken } from 'tamagui';
import { MultiSelectList } from './MultiSelectList';
import { TileHeader } from './TileHeader';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Text';

type Props = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: Option[];
  onChange: (selected: Option[]) => void;
  selected?: Option[];
};

export const MultiSelect = ({
  title,
  open,
  onOpenChange,
  options,
  onChange,
  selected = [],
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(selected);

  return (
    <Sheet
      modal={true}
      open={open}
      snapPointsMode="fit"
      dismissOnOverlayPress
      dismissOnSnapToBottom
      onOpenChange={onOpenChange}
    >
      <Sheet.Overlay
        fullscreen={true}
        backgroundColor={'black'}
        opacity={0.5}
      />
      <Sheet.Frame
        padding={'$4'}
        borderTopLeftRadius="$8"
        borderTopRightRadius="$8"
        elevation={6}
        backgroundColor={getToken('$color.primary')}
      >
        <TileHeader
          title={title}
          rightButtonTitle="Done"
          onRightButton={() => {
            onOpenChange(false);
          }}
        />
        <Sheet.ScrollView
          marginBottom="$5"
          showsVerticalScrollIndicator={false}
          height={options.length > 8 ? 376 : options.length * 47}
          marginTop={'$2'}
        >
          <MultiSelectList
            options={options}
            onChange={selected => {
              setSelectedOptions(selected);
              onChange(selected);
            }}
            selected={selectedOptions}
          />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};
