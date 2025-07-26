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
  OtherInformation &
  Documents &
  ProfessionalInformation;

// export const dummyUserProfile: UserProfile = {
//   fullName: 'John Doe',
//   email: 'john.doe@example.com',
//   gender: 'male',
//   state: 'westBengal',
//   city: 'kolkata',
//   pincode: '700001',
//   country: 'India',
//   phoneNumber: '123-456-7890',
//   dateOfBirth: '1990-01-01', // ISO format
//   diet: 'vegetarian',
//   height: 180, // in cm
//   weight: 75, // in kg
//   religion: 'hindu',
//   caste: 'general',
//   motherTongue: 'bengali',
//   maritalStatus: 'single',
//   education: 'bachelorDegree',
//   idProof: 'Passport',
//   addressProof: 'Aadhar Card',
//   occupation: 'doctor',
//   annualIncome: '80,000',
//   aboutMe:
//     'I am a software engineer with a passion for technology and innovation. I enjoy traveling and exploring new cultures.',
// };

// export const dummyUserProfileWithPicture: UserProfile = {
//   ...dummyUserProfile,
//   profilePicture: require('@/assets/images/Avatar.png'), // Assuming you have a local image asset
// };

export type User = {
  id: number;
  email: string;
  phone: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: [number, number, number, number, number, number];
  lastLogin: [number, number, number, number, number, number, number];
  profile: UserProfile;
} & MatchInformation;

// export const dummyUser: User = {
//   id: 1,
//   email: 'john.doe@example.com',
//   phone: '123-456-7890',
//   isVerified: true,
//   isActive: true,
//   createdAt: [2020, 1, 1, 12, 0, 0],
//   lastLogin: [2023, 1, 1, 12, 0, 0, 0],
//   acceptedCount: 700,
//   receivedCount: 1000,
//   sentCount: 500,
//   profile: dummyUserProfile,
// };

export type UpdateUserProfileRequest = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  city?: string;
  state?: string;
  country?: string;
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
  profilePicture?: ImageSourcePropType;
};
