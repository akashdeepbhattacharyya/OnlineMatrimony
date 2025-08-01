import { Option } from '@/src/resources/form';

export const genders = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};
export type Gender = keyof typeof genders;

export const getGenderIcon = (gender: Gender) => {
  switch (gender) {
    case 'OTHER':
      return 'transgender';
    default:
      return gender.toLowerCase();
  }
};

export const genderOptions: Option<Gender>[] = Object.keys(genders).map(
  key => ({
    label: genders[key as keyof typeof genders],
    value: key as Gender,
  }),
);
