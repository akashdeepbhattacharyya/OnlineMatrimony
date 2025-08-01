import { Option } from '@/src/resources/form';

export const educations = {
  NO_FORMAL_EDUCATION: 'No Formal Education',
  HIGH_SCHOOL: 'High School',
  DIPLOMA: 'Diploma',
  BACHELOR_DEGREE: "Bachelor's Degree",
  MASTER_DEGREE: "Master's Degree",
  DOCTORATE: 'Doctorate',
  OTHER: 'Other',
};
export type Education = keyof typeof educations;

export const educationOptions: Option<Education>[] = Object.entries(
  educations,
).map(([key, value]) => ({
  label: value,
  value: key as Education,
}));
