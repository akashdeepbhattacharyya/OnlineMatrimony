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
} from '../models/User';

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

export const toPartnerPreferenceFormType = (
  preferences?: PartnerPreferences,
): PartnerPreferenceFormType => {
  if (!preferences) {
    return {
      ageRange: { min: 25, max: 50 },
      heightRange: { min: 4.5, max: 7 },
      annualIncomeRange: { min: 5, max: 500 },
    };
  }
  return {
    ageRange: {
      min: preferences.minAge,
      max: preferences.maxAge,
    },
    heightRange: {
      min: preferences.minHeight,
      max: preferences.maxHeight,
    },
    maritalStatuses: preferences.maritalStatus
      ? (preferences.maritalStatus.split(',') as MaritalStatus[])
      : undefined,
    gender: preferences.gender as Gender,
    cities: preferences.cities
      ? (preferences.cities.split(',') as City[])
      : undefined,
    states: preferences.states
      ? (preferences.states.split(',') as State[])
      : undefined,
    diets: preferences.diet
      ? (preferences.diet.split(',') as Diet[])
      : undefined,
    religions: preferences.religion
      ? (preferences.religion.split(',') as Religion[])
      : undefined,
    motherTongues: preferences.motherTongue
      ? (preferences.motherTongue.split(',') as MotherTongue[])
      : undefined,
    castes: preferences.caste
      ? (preferences.caste.split(',') as Caste[])
      : undefined,
    educations: preferences.education
      ? (preferences.education.split(',') as Education[])
      : undefined,
    occupations: preferences.occupation
      ? (preferences.occupation.split(',') as Occupation[])
      : undefined,
    annualIncomeRange: {
      min: preferences.minIncome,
      max: preferences.maxIncome,
    },
  };
};

export const toPartnerPreferencesRequest = (
  form: PartnerPreferenceFormType,
): UpdatePartnerPreferencesRequest => {
  return {
    minAge: form.ageRange.min,
    maxAge: form.ageRange.max,
    minHeight: form.heightRange.min,
    maxHeight: form.heightRange.max,
    maritalStatus: form.maritalStatuses?.join(',') || '',
    religion: form.religions?.join(',') || '',
    caste: form.castes?.join(',') || '',
    motherTongue: form.motherTongues?.join(',') || '',
    diet: form.diets?.join(',') || '',
    education: form.educations?.join(',') || '',
    occupation: form.occupations?.join(',') || '',
    minIncome: form.annualIncomeRange.min,
    maxIncome: form.annualIncomeRange.max,
    cities: form.cities?.join(',') || '',
    states: form.states?.join(',') || '',
    countries: 'INDIA',
  };
};
