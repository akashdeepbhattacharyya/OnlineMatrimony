import { ImageSourcePropType } from "react-native";

export interface matchesData {
  id: string;
  name: string;
  age: number;
  religion:string;
  caste: string;
  language: string;
  location: string;
  image: ImageSourcePropType; // Replace with actual image URL
  highlight: boolean;
}
export interface testimonialData {
  id: string;
  tips: string;
  play: boolean;
  image: ImageSourcePropType;
  thumbnail: string;
}