import { Option } from '@/resources/form';

export const maritalStatuses = {
  DIVORCED: 'Divorced',
  WIDOWED: 'Widowed',
  NEVER_MARRIED: 'Single',
};
export type MaritalStatus = keyof typeof maritalStatuses;

export const maritalStatusOptions: Option<MaritalStatus>[] = Object.keys(
  maritalStatuses,
).map(key => ({
  label: maritalStatuses[key as keyof typeof maritalStatuses],
  value: key as MaritalStatus,
}));
