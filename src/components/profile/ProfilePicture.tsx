import React, { use, useEffect, useState } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { View, Image, YStack, ViewProps } from 'tamagui';
import OuterCircle from '@/assets/images/profile-image-circle-outer.svg';
import InnerCircle from '@/assets/images/profile-image-circle-inner.svg';
import CameraIcon from '@/assets/images/cameraIcon.svg';
import * as ImagePicker from 'expo-image-picker'
import { HttpClient } from '@/src/api/HttpClient';
import { updateProfileImg } from '@/src/api/UserService'; // Ensure this service is correctly implemented
import { useTokenCallBack } from '@/src/store/hook';

type Props = {
  profilePicture?: ImageSourcePropType;
  isEdit?: boolean; // Optional prop to control edit state
} & ViewProps;

export const ProfilePicture = ({ profilePicture, isEdit, ...props }: Props) => {
  const [imageUri, setImageUri] = useState<ImageSourcePropType | null>(null);
  // const userApiService = new UserApiService(HttpClient) // ✅ `httpClient` must be an instance of IHttpClient

  useEffect(() => {
    if (profilePicture) {
      setImageUri(profilePicture);
    }
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access gallery is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri
      const name = uri.split('/').pop() || 'profile.jpg'
      const type = 'image/jpeg'

      const formData = new FormData()
      formData.append('photo', {
        uri,
        name,
        type,
      } as any)
      formData.append('isPrimary', 'true')
      try {
        setImageUri({ uri })
        const res = await updateProfileImg(formData)
        if (res.ok) {
          alert('Upload successful')
        } else {
          alert('Upload failed')
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    }
  }
  return (
    <YStack alignItems="center" {...props}>
      <YStack position="absolute">
        <OuterCircle />
      </YStack>
      <YStack position="absolute" marginTop={6} marginRight={12}>
        <InnerCircle />
      </YStack>
      <View
        width={94}
        height={94}
        borderRadius={50}
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        backgroundColor={'blue'}
        marginTop={14.5}
        marginLeft={2}
      >
        {imageUri && (
          <Image source={imageUri} width={94} height={94} />
        )}
      </View>
      {isEdit && (
        <TouchableOpacity onPress={pickImage} style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <YStack
            position="absolute"
            bottom={-10}
            right={0}
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor="$background"
            justifyContent="center"
            alignItems="center"
            zIndex={3}
          >
            <CameraIcon width={18} height={18} />
          </YStack>
        </TouchableOpacity>
      )}
    </YStack>
  );
};
