import { Option } from '@/resources/form';

export const castes = {
  GENERAL: 'General',
  OBC: 'OBC',
  SC: 'SC',
  ST: 'ST',
  OTHER: 'Other',
};
export type Caste = keyof typeof castes;

export const casteOptions: Option<Caste>[] = Object.entries(castes).map(
  ([key, value]) => ({
    label: value,
    value: key as Caste,
  }),
);
