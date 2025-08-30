import { Text } from "@/components/common/Text";
import { View, XStack, YStack } from "tamagui";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { useAppSelector } from "@/services/store/hook";
import { useError } from "./useError";

const DIALOG_CLOSE_TIME_IN_MILLS = 3000;

export const ErrorDialog = () => {
  const { visible, data } = useAppSelector((state) => state.error);
  const { hideError } = useError();

  useEffect(() => {
    const timeId = setTimeout(() => {
      hideError();
    }, DIALOG_CLOSE_TIME_IN_MILLS);

    if (!visible) {
      clearTimeout(timeId);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [hideError, visible]);

  return (
    <View width="100%" theme="error_dialog">
      <View
        backgroundColor="#FFFFFF"
        width="100%"
        height="100%"
        position="absolute"
        borderRadius={20}
      />
      <YStack flex={1} padding={16} gap={10}>
        <XStack alignItems="center" gap={10}>
          <Feather name={"alert-circle"} size={24} color="#F15B6A" />
          <XStack flex={1} alignItems="center" gap={10}>
            <Text fontSize={24}>{data?.title}</Text>
          </XStack>

          <Feather
            name={"x"}
            size={16}
            color="#000000"
            onPress={() => {
              hideError();
            }}
          />
        </XStack>

        <Text size="normal" weight="normal" fontSize={18} font="heading">
          {data?.description}
        </Text>
      </YStack>
    </View>
  );
};
