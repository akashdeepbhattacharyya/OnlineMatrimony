import { ImageSourcePropType } from 'react-native';

export interface Tip {
  id: string;
  title: string;
  play: boolean;
  image: ImageSourcePropType;
  thumbnail: string;
}

export interface Testimonial {
  id: string;
  message: string;
  name: string;
  title: string;
  image: ImageSourcePropType;
}
