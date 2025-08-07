import { Option } from '@/src/resources/form';
import { Sheet, getToken } from 'tamagui';
import { TileHeader } from './TileHeader';
import { useState } from 'react';
import { SelectList } from './SelectList';

type Props<T> = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: Option<T>[];
  onChange: (selected: T) => void;
  selected?: T;
};

export function Select<T>({
  title,
  open,
  onOpenChange,
  options,
  onChange,
  selected,
}: Props<T>) {
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selected);

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
          <SelectList
            options={options}
            onChange={selected => {
              setSelectedItem(selected);
              onChange(selected);
            }}
            selected={selectedItem}
          />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
