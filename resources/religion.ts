import { Option } from '@/resources/form';

export const religions = {
  HINDU: 'Hindu',
  MUSLIM: 'Muslim',
  CHRISTIAN: 'Christian',
  SIKH: 'Sikh',
  BUDDHIST: 'Buddhist',
  JAIN: 'Jain',
  PARSI: 'Parsi',
  OTHER: 'Other',
};
export type Religion = keyof typeof religions;

export const religionOptions: Option<Religion>[] = Object.entries(
  religions,
).map(([key, value]) => ({
  label: value,
  value: key as Religion,
}));
