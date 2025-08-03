import { ImageSourcePropType } from 'react-native';
import { Gender } from '../resources/gender';
import { City, State } from '../resources/city-state';
import { Caste } from '../resources/caste';
import { Education } from '../resources/education';
import { MaritalStatus } from '../resources/marital-status';
import { MotherTongue } from '../resources/mother-tongue';
import { Occupation } from '../resources/occupation';
import { Religion } from '../resources/religion';

export type PersonalInformation = {
  fullName: string;
  dateOfBirth: string; // ISO format
  gender: Gender; // Assuming
  city?: City; // Optional field
  state?: State; // Optional field for address
  pincode?: string; // Optional field for postal code
};

export type MatchInformation = {
  acceptedCount: number;
  receivedCount: number;
  sentCount: number;
};

export type OtherInformation = {
  diet: string;
  height: number;
  weight: number;
  religion?: Religion; // Optional field
  caste?: Caste; // Optional field
  motherTongue?: MotherTongue; // Optional field
  maritalStatus?: MaritalStatus; // Optional field
  education?: Education; // Optional field
};

export type Documents = {
  idProof?: string; // URL or local path to ID proof document
  addressProof?: string; // URL or local path to address proof document
};

export type ProfessionalInformation = {
  occupation: Occupation; // Use the Occupation type
  annualIncome: string; // e.g., "50000 USD"
};

export type UserProfile = {
  aboutMe?: string; // Optional field for a brief description about the user
  photoUrls?: string[]; // Array of URLs for multiple photos
  primaryPhotoUrl?: string; // Optional field for profile picture
} & PersonalInformation &
  OtherInformation &
  Documents &
  ProfessionalInformation;

export type User = {
  id: number;
  email: string;
  phone: string;
  profile: UserProfile;
  preference?: PartnerPreferences;
} & MatchInformation;

export type PartnerPreferences = {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  maritalStatus: string;
  religion: string;
  caste: string;
  motherTongue: string;
  diet: string;
  education: string;
  occupation: string;
  minIncome: number;
  maxIncome: number;
  cities: string;
  states: string;
  countries: string;
  gender: string;
};

export type UpdateUserProfileRequest = {
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
};

export type UpdatePartnerPreferencesRequest = {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  maritalStatus: string;
  religion: string;
  caste: string;
  motherTongue: string;
  diet: string;
  education: string;
  occupation: string;
  minIncome: number;
  maxIncome: number;
  cities: string;
  states: string;
  countries: string;
};
