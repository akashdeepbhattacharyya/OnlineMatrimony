import { Option } from '@/src/resources/form';

export const educations = {
  NO_FORMAL_EDUCATION: 'No Formal Education',
  HIGH_SCHOOL: 'High School',
  DIPLOMA: 'Diploma',
  GRADUATE: 'Graduate',
  POST_GRADUATE: 'Post Graduate',
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
