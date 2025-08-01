import { Option } from '@/src/resources/form';

export const motherTongues = {
  ENGLISH: 'English',
  HINDI: 'Hindi',
  BENGALI: 'Bengali',
  TELUGU: 'Telugu',
  TAMIL: 'Tamil',
  MARATHI: 'Marathi',
  URDU: 'Urdu',
  GUJARATI: 'Gujarati',
  MALAYALAM: 'Malayalam',
  KANNADA: 'Kannada',
};
export type MotherTongue = keyof typeof motherTongues;

export const motherTongueOptions: Option<MotherTongue>[] = Object.entries(
  motherTongues,
).map(([key, value]) => ({
  label: value,
  value: key as MotherTongue,
}));
