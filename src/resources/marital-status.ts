import { Option } from '@/src/resources/form';

export const maritalStatus = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  WIDOWED: 'Widowed',
  SEPARATED: 'Separated',
  NEVER_MARRIED: 'Never Married',
};
export type MaritalStatus = keyof typeof maritalStatus;

export const maritalStatusOptions: Option<MaritalStatus>[] = Object.keys(
  maritalStatus,
).map(key => ({
  label: maritalStatus[key as keyof typeof maritalStatus],
  value: key as MaritalStatus,
}));
