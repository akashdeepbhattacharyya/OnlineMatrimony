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
