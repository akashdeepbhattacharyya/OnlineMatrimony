import { Gender } from './gender';
import { City, State } from './city-state';
import { Caste } from './caste';
import { MaritalStatus } from './marital-status';
import { MotherTongue } from './mother-tongue';
import { Diet } from './diet';
import { Religion } from './religion';
import { Education } from './education';
import { Occupation } from './occupation';

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

export type UpdateUserProfileFormType = {
  fullName: string;
  dateOfBirth: string;
  gender?: Gender;
  // height?: number;
  // weight?: number;
  // maritalStatus?: string;
  // religion?: string;
  state?: string;
  city?: string;
  pincode?: string;
  country?: string;
  aboutMe?: string;
};

export type PartnerPreferenceFormType = {
  ageRange: { min: number; max: number };
  heightRange: { min: number; max: number };
  maritalStatuses?: MaritalStatus[];
  gender?: Gender;
  cities?: City[];
  states?: State[];
  diets?: Diet[];
  religions?: Religion[];
  motherTongues?: MotherTongue[];
  castes?: Caste[];
  educations?: Education[];
  occupations?: Occupation[];
  annualIncomeRange: { min: number; max: number };
};
