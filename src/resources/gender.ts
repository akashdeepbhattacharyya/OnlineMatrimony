export const genders = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};
export type Gender = keyof typeof genders;

export const getGenderIcon = (gender: Gender) => {
  switch (gender) {
    case 'other':
      return 'transgender';
    default:
      return gender;
  }
};
