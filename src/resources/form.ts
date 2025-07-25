import { Gender } from './gender';

export type Option<T = string> = {
  label: string;
  value: T;
};

export type CheckBoxOption<T = string> = {
  icon?: React.ReactNode;
} & Option<T>;

export type UserRegistrationFormType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};

export type LoginFormType = {
  emailOrPhone: string;
  password: string;
  terms: boolean;
};

export type UpdateProfileFormType = {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  // height?: number;
  // weight?: number;
  // maritalStatus?: string;
  // religion?: string;
  state?: string;
  city?: string;
  pincode?: string;
  aboutMe?: string;
};
