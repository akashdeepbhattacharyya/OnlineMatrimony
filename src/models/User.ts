import { ImageSourcePropType } from 'react-native';
import { Gender } from '../resources/gender';
import {
  Caste,
  City,
  Education,
  MaritalStatus,
  MotherTongue,
  Occupation,
  Religion,
  State,
} from '../resources/update-profile';

export type PersonalInformation = {
  fullName: string;
  dateOfBirth: string; // ISO format
  gender: Gender; // Assuming
  city?: City; // Optional field
  state?: State; // Optional field for address
  pincode?: string; // Optional field for postal code
  country?: string; // Optional field for country
  email?: string; // Optional field for email
  phoneNumber?: string; // Optional field for phone number
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
  profilePicture?: ImageSourcePropType; // Optional field for profile picture
} & PersonalInformation &
  MatchInformation &
  OtherInformation &
  Documents &
  ProfessionalInformation;

export const dummyUserProfile: UserProfile = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  acceptedCount: 700,
  receivedCount: 1000,
  sentCount: 500,
  gender: 'male',
  state: 'westBengal',
  city: 'kolkata',
  pincode: '700001',
  country: 'India',
  phoneNumber: '123-456-7890',
  dateOfBirth: '1990-01-01', // ISO format
  diet: 'vegetarian',
  height: 180, // in cm
  weight: 75, // in kg
  religion: 'hindu',
  caste: 'general',
  motherTongue: 'bengali',
  maritalStatus: 'single',
  education: 'bachelorDegree',
  idProof: 'Passport',
  addressProof: 'Aadhar Card',
  occupation: 'doctor',
  annualIncome: '80,000',
  aboutMe:
    'I am a software engineer with a passion for technology and innovation. I enjoy traveling and exploring new cultures.',
};

export const dummyUserProfileWithPicture: UserProfile = {
  ...dummyUserProfile,
  profilePicture: require('@/assets/images/Avatar.png'), // Assuming you have a local image asset
};
