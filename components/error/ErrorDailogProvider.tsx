import { View } from "tamagui";
import { ErrorDialog } from "./ErrorDialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppSelector } from "@/services/store/hook";

type ErrorDialogProviderProps = {
  children: React.ReactNode;
};

export const ErrorDialogProvider = ({ children }: ErrorDialogProviderProps) => {
  const { visible } = useAppSelector((state) => state.error);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View height="100%">
      {children}
      {visible && (
        <View
          position="absolute"
          width="90%"
          alignSelf="center"
          y={safeAreaInsets.top + 4}
          zIndex={1}
        >
          <ErrorDialog />
        </View>
      )}
    </View>
  );
};
