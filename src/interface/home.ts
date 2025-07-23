import { ImageSourcePropType } from 'react-native';

export interface matchesData {
  id: string;
  name: string;
  age: number;
  religion: string;
  caste: string;
  language: string;
  location: string;
  image: ImageSourcePropType; // Replace with actual image URL
  highlight: boolean;
}
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
