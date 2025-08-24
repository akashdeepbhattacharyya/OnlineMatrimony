import { YStack, ViewProps } from 'tamagui';
import { useImagePicker } from '@/hooks/useImagePicker';
import { Sheet } from './Sheet';
import { PrimaryButton } from './PrimaryButton';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (uri: string) => void;
  onError?: (error: string) => void;
} & ViewProps;

export const ImagePicker = ({
  open,
  onOpenChange,
  onSelectImage,
  onError,
}: Props) => {
  const { pickImage, takePhoto, image, error } = useImagePicker();

  const handlePhotoLibrary = async () => {
    onOpenChange(false);
    await pickImage();
    if (image) {
      onSelectImage(image);
    }
    if (error) {
      onError?.(error);
    }
  };

  const handleTakePhoto = async () => {
    onOpenChange(false);
    await takePhoto();
    if (image) {
      onSelectImage(image);
    }
    if (error) {
      onError?.(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <YStack theme="image_picker" paddingVertical="$5" gap="$4">
        <PrimaryButton
          theme={'photo_library_button'}
          title="Choose from Library"
          onPress={handlePhotoLibrary}
          backgroundColor="$background"
          showArrow={false}
        />
        <PrimaryButton
          theme={'take_photo_button'}
          title="Take Photo"
          onPress={handleTakePhoto}
          backgroundColor="$background"
          showArrow={false}
        />
      </YStack>
    </Sheet>
  );
};
