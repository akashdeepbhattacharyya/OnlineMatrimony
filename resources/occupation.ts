import { Option } from '@/resources/form';

export const occupations = {
  ENGINEER: 'Engineer',
  DOCTOR: 'Doctor',
  TEACHER: 'Teacher',
  LAWYER: 'Lawyer',
  ARTIST: 'Artist',
  OTHER: 'Other',
};
export type Occupation = keyof typeof occupations;

export const occupationOptions: Option<Occupation>[] = Object.entries(
  occupations,
).map(([key, value]) => ({
  label: value,
  value: key as Occupation,
}));
