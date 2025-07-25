import { ImageSourcePropType } from 'react-native';
import { Gender } from '../resources/gender';

export type PersonalInformation = {
  fullName: string;
  dateOfBirth: string; // ISO format
};

export type OtherInformation = {
  diet: string;
  height: string;
  weight: string;
  religion?: string; // Optional field
  caste?: string; // Optional field
  language?: string[]; // Optional field
  maritalStatus?: string; // Optional field
  highestEducation?: string; // Optional field
};

export type Documents = {
  idProof?: string; // URL or local path to ID proof document
  addressProof?: string; // URL or local path to address proof document
};

export type ProfessionalInformation = {
  occupation: string;
  annualIncome: string; // e.g., "50000 USD"
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  acceptedCount: number;
  receivedCount: number;
  sentCount: number;
  gender: Gender; // Assuming
  address?: string; // Optional field
  phoneNumber?: string; // Optional field
  personalInformation: PersonalInformation;
  otherInformation: OtherInformation;
  profilePicture?: ImageSourcePropType; // URL or local path to the profile picture
  documents?: Documents; // Optional field for storing documents
  professionalInformation?: ProfessionalInformation; // Optional field for professional details
  aboutSelf?: string; // Optional field for a brief description about the user
};

export const dummyUserProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  acceptedCount: 700,
  receivedCount: 1000,
  sentCount: 500,
  gender: 'male',
  address: '123 Main St, Springfield, USA',
  phoneNumber: '123-456-7890',
  personalInformation: {
    fullName: 'John Doe',
    dateOfBirth: '1990-01-01',
  },
  otherInformation: {
    diet: 'Vegetarian',
    height: '180 cm',
    weight: '75 kg',
    religion: 'Christianity',
    caste: 'General',
    language: ['English', 'Spanish'],
    maritalStatus: 'Single',
    highestEducation: "Bachelor's Degree",
  },
  documents: {
    idProof: 'Passport',
    addressProof: 'Aadhar Card',
  },
  professionalInformation: {
    occupation: 'Salaried',
    annualIncome: '80,000 - 1,00,000',
  },
  aboutSelf:
    'I am a software engineer with a passion for technology and innovation. I enjoy traveling and exploring new cultures.',
};
export const dummyUserProfileWithPicture: UserProfile = {
  ...dummyUserProfile,
  profilePicture: { uri: 'https://ui-avatars.com/api/?name=Akash+Deep' }, // Assuming you have a local image asset
};
