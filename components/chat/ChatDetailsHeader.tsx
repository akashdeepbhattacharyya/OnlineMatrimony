import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ViewProps, XStack } from "tamagui";
import { Text } from "../common/Text";
import Back from "@/assets/images/back.svg";
import { ProfilePicture } from "../profile/ProfilePicture";
import { MatchedUserProfile } from "@/models/Match";

type Props = {
  userProfile: MatchedUserProfile;
  onProfilePress: () => void;
} & ViewProps;

export const ChatDetailsHeader = ({ userProfile, onProfilePress, ...props }: Props) => {
  const handelBack = () => {
    router.back();
  };

  return (
    <XStack
      justifyContent={'space-between'}
      alignItems="center"
      paddingVertical={'$3'}
      paddingHorizontal={'$4'}
      {...props}
    >
      <TouchableOpacity onPress={handelBack}>
        <Back width={20} height={20} />
      </TouchableOpacity>
      <Text
        font="heading"
        size="normal"
        textAlign={'center'}
      >
        {userProfile.fullName}
      </Text>
      <TouchableOpacity onPress={onProfilePress}>
        <ProfilePicture
          uri={
            userProfile.primaryPhotoUrl ||
            `https://ui-avatars.com/api/?name=${userProfile.fullName}&size=512`
          }
          outerCircleSize={38}
          innerCircleSize={32}
          imageSize={26}
        />
      </TouchableOpacity>
    </XStack>
  );
};