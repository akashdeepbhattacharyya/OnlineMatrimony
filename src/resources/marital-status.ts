import { Option } from '@/src/resources/form';

export const maritalStatuses = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  WIDOWED: 'Widowed',
  SEPARATED: 'Separated',
  NEVER_MARRIED: 'Never Married',
};
export type MaritalStatus = keyof typeof maritalStatuses;

export const maritalStatusOptions: Option<MaritalStatus>[] = Object.keys(
  maritalStatuses,
).map(key => ({
  label: maritalStatuses[key as keyof typeof maritalStatuses],
  value: key as MaritalStatus,
}));
