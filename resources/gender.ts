export const genders = ['male', 'female', 'other'] as const;
export type Gender = (typeof genders)[number];

export const getGenderIcon = (gender: Gender) => {
  switch (gender) {
    case 'other':
      return 'transgender';
    default:
      return gender;
  }
};
