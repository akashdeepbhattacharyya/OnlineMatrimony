import { Gender } from './gender';
import { City, State } from './city-state';
import { Caste } from './caste';
import { MaritalStatus } from './marital-status';
import { MotherTongue } from './mother-tongue';
import { Diet } from './diet';
import { Religion } from './religion';
import { Education } from './education';
import { Occupation } from './occupation';
import {
  PartnerPreferences,
  UpdatePartnerPreferencesRequest,
  UpdateUserProfileRequest,
  UserProfile,
} from '../models/User';

export type Option<T = string> = {
  label: string;
  value: T;
};

export type OptionWithIcon<T = string> = {
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
  height?: number;
  weight?: number;
  maritalStatus?: MaritalStatus;
  state?: State;
  city?: City;
  pincode?: string;
  country?: string;
  diet?: Diet;
  caste?: Caste;
  motherTongue?: MotherTongue;
  religion?: Religion;
  education?: Education;
  occupation?: Occupation;
  annualIncome?: string;
  aboutMe?: string;
};

/*
fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  pincode?: string;
  aboutMe?: string;
  diet?: string;
  height?: number;
  weight?: number;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  annualIncome?: string;
*/

export type PartnerPreferenceFormType = {
  maxAge: number;
  minAge: number;
  maxHeight: number;
  minHeight: number;
  maxIncome: number;
  minIncome: number;
  maritalStatuses?: MaritalStatus[];
  gender?: Gender;
  cities?: City[];
  states?: State[];
  diet?: Diet;
  religions?: Religion[];
  motherTongue?: MotherTongue;
  castes?: Caste[];
  educations?: Education[];
  occupations?: Occupation[];
};

export const toUpdateUserProfileFormType = (
  userProfile: UserProfile,
): UpdateUserProfileFormType => {
  return {
    fullName: userProfile.fullName,
    dateOfBirth: userProfile.dateOfBirth,
    gender: userProfile.gender,
    height: userProfile.height,
    weight: userProfile.weight,
    maritalStatus: userProfile.maritalStatus,
    state: userProfile.state,
    city: userProfile.city,
    pincode: userProfile.pincode,
    diet: userProfile.diet,
    caste: userProfile.caste,
    motherTongue: userProfile.motherTongue,
    religion: userProfile.religion,
    education: userProfile.education,
    occupation: userProfile.occupation,
    annualIncome: userProfile.annualIncome,
    aboutMe: userProfile.aboutMe,
  };
};

export const toUpdateUserProfileRequest = (
  form: UpdateUserProfileFormType,
): UpdateUserProfileRequest => {
  return {
    fullName: form.fullName,
    dateOfBirth: form.dateOfBirth,
    gender: form.gender,
    height: form.height,
    weight: form.weight,
    maritalStatus: form.maritalStatus,
    state: form.state,
    city: form.city,
    pincode: form.pincode,
    diet: form.diet,
    caste: form.caste,
    motherTongue: form.motherTongue,
    religion: form.religion,
    education: form.education,
    occupation: form.occupation,
    annualIncome: form.annualIncome,
    aboutMe: form.aboutMe,
  };
};

export const toPartnerPreferenceFormType = (
  preferences?: PartnerPreferences,
): PartnerPreferenceFormType => {
  if (!preferences) {
    return {
      maxAge: 46,
      minAge: 25,
      maxHeight: 213,
      minHeight: 137,
      maxIncome: 1000000,
      minIncome: 500000,
    };
  }
  return {
    maxAge: preferences.maxAge,
    minAge: preferences.minAge,
    maxHeight: preferences.maxHeight,
    minHeight: preferences.minHeight,
    maxIncome: preferences.maxIncome,
    minIncome: preferences.minIncome,
    maritalStatuses: preferences.maritalStatuses?.split(',') as MaritalStatus[],
    gender: preferences.gender as Gender,
    cities: preferences?.cities.split(',') as City[],
    states: preferences?.states.split(',') as State[],
    diet: preferences.diet as Diet,
    religions: preferences.religions?.split(',') as Religion[],
    motherTongue: preferences.motherTongue as MotherTongue,
    castes: preferences.castes?.split(',') as Caste[],
    educations: preferences.educations?.split(',') as Education[],
    occupations: preferences.occupations?.split(',') as Occupation[],
  };
};

export const toPartnerPreferencesRequest = (
  form: PartnerPreferenceFormType,
): UpdatePartnerPreferencesRequest => {
  return {
    minAge: form.minAge,
    maxAge: form.maxAge,
    minHeight: form.minHeight,
    maxHeight: form.maxHeight,
    maritalStatuses: form.maritalStatuses?.join(',') || '',
    religions: form.religions?.join(',') || '',
    castes: form.castes?.join(',') || '',
    motherTongue: form.motherTongue || '',
    diet: form.diet || '',
    educations: form.educations?.join(',') || '',
    occupations: form.occupations?.join(',') || '',
    minIncome: form.minIncome,
    maxIncome: form.maxIncome,
    cities: form.cities?.join(',') || '',
    states: form.states?.join(',') || '',
    countries: 'INDIA',
    gender: form.gender || '',
  };
};

export type MessageFormType = {
  text: string;
  senderId: string;
  chatId: string;
};
