import { Sheet } from "@tamagui/sheet";
import { ViewProps } from "tamagui";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
} & ViewProps;

export function SheetC({ open, onOpenChange, children }: Props) {
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
        backgroundColor={"black"}
        opacity={0.5}
      />
      <Sheet.Frame
        theme="light_tab"
        paddingHorizontal="$5"
        paddingBottom="$5"
        borderTopLeftRadius="$8"
        borderTopRightRadius="$8"
        marginTop="$6"
        elevation={6}
        backgroundColor="$background"
      >
        <Sheet.ScrollView
          marginTop="$4"
          marginBottom="$2"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}

export { SheetC as Sheet };