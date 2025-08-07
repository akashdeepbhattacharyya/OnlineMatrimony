import { Gender } from '../resources/gender';
import { City, State } from '../resources/city-state';
import { Caste } from '../resources/caste';
import { Education } from '../resources/education';
import { MaritalStatus } from '../resources/marital-status';
import { MotherTongue } from '../resources/mother-tongue';
import { Occupation } from '../resources/occupation';
import { Religion } from '../resources/religion';
import { Diet } from '../resources/diet';

/**
 * Represents the personal information of a user.
 *
 * @property fullName - The full name of the user.
 * @property dateOfBirth - The user's date of birth in string format.
 * @property gender - The gender of the user.
 * @property city - The city where the user resides.
 * @property state - The state where the user resides.
 * @property pincode - The postal code of the user's location.
 * @property age - The age of the user.
 */
export type PersonalInformation = {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  city?: City;
  state?: State;
  pincode?: string;
  age?: number;
};

/**
 * Represents additional personal information about a user.
 *
 * @property diet - The user's dietary preference.
 * @property height - The user's height in centimeters.
 * @property weight - The user's weight in kilograms.
 * @property religion - The user's religion.
 * @property caste - The user's caste.
 * @property motherTongue - The user's mother tongue.
 * @property maritalStatus - The user's marital status.
 * @property education - The user's highest education level.
 * @property occupation - The user's occupation.
 */
export type OtherInformation = {
  diet?: Diet;
  height?: number;
  weight?: number;
  religion?: Religion;
  caste?: Caste;
  motherTongue?: MotherTongue;
  maritalStatus?: MaritalStatus;
  education?: Education;
  occupation?: Occupation;
};

export type Documents = {
  idProof?: string;
  addressProof?: string;
};

/**
 * Represents the professional information of a user.
 *
 * @property occupation - The user's occupation, represented by the `Occupation` type.
 * @property annualIncome - The user's annual income as a string.
 */
export type ProfessionalInformation = {
  occupation?: Occupation;
  annualIncome?: string;
};

/**
 * Represents a user's profile information, including personal, professional, and other details.
 *
 * @property aboutMe - Optional description or bio about the user.
 * @property photoUrls - Optional array of URLs pointing to the user's photos.
 * @property primaryPhotoUrl - Optional URL of the user's primary photo.
 *
 * @extends PersonalInformation
 * @extends OtherInformation
 * @extends ProfessionalInformation
 */
export type UserProfile = {
  aboutMe?: string;
  photoUrls?: string[];
  primaryPhotoUrl?: string;
} & PersonalInformation &
  OtherInformation &
  ProfessionalInformation;

/**
 * Represents a user in the online matrimony system.
 *
 * @property {number} id - Unique identifier for the user.
 * @property {string} email - Email address of the user.
 * @property {string} phone - Phone number of the user.
 * @property {UserProfile} profile - Profile details of the user.
 * @property {PartnerPreferences} [preference] - Optional partner preferences specified by the user.
 * @property {MatchInformation} - Additional match-related information inherited from MatchInformation.
 */
export type User = {
  id: number;
  email: string;
  phone: string;
  profile: UserProfile;
  preference?: PartnerPreferences;
};

/**
 * Represents the preferences a user has for their potential partner.
 *
 * @property minAge - The minimum age of the preferred partner.
 * @property maxAge - The maximum age of the preferred partner.
 * @property minHeight - The minimum height of the preferred partner (in centimeters).
 * @property maxHeight - The maximum height of the preferred partner (in centimeters).
 * @property maritalStatuses - The preferred marital statuses of the partner.
 * @property religions - The preferred religions of the partner.
 * @property castes - The preferred castes of the partner.
 * @property motherTongue - The preferred mother tongue of the partner.
 * @property diet - The preferred dietary habit of the partner.
 * @property educations - The preferred education levels of the partner.
 * @property occupations - The preferred occupations of the partner.
 * @property minIncome - The minimum annual income of the preferred partner.
 * @property maxIncome - The maximum annual income of the preferred partner.
 * @property cities - The preferred cities where the partner may reside.
 * @property states - The preferred states where the partner may reside.
 * @property countries - The preferred countries where the partner may reside.
 * @property gender - The preferred gender of the partner.
 */
export type PartnerPreferences = {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  maritalStatuses: string;
  religions: string;
  castes: string;
  motherTongue: string;
  diet: string;
  educations: string;
  occupations: string;
  minIncome: number;
  maxIncome: number;
  cities: string;
  states: string;
  countries: string;
  gender: string;
};

/**
 * Represents the request payload for updating a user's profile.
 *
 * @property fullName - The user's full name.
 * @property dateOfBirth - The user's date of birth in string format.
 * @property gender - The user's gender.
 * @property city - The city where the user resides.
 * @property state - The state where the user resides.
 * @property pincode - The postal code of the user's location.
 * @property aboutMe - A brief description about the user.
 * @property diet - The user's dietary preference.
 * @property height - The user's height in centimeters.
 * @property weight - The user's weight in kilograms.
 * @property religion - The user's religion.
 * @property caste - The user's caste.
 * @property motherTongue - The user's mother tongue.
 * @property maritalStatus - The user's marital status.
 * @property education - The user's highest educational qualification.
 * @property occupation - The user's occupation.
 * @property annualIncome - The user's annual income.
 */
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

/**
 * Represents a request to update partner preferences for a user.
 *
 * @property minAge - Minimum preferred age of the partner.
 * @property maxAge - Maximum preferred age of the partner.
 * @property minHeight - Minimum preferred height of the partner.
 * @property maxHeight - Maximum preferred height of the partner.
 * @property gender - Preferred gender of the partner.
 * @property maritalStatuses - Preferred marital statuses of the partner.
 * @property religions - Preferred religions of the partner.
 * @property castes - Preferred castes of the partner.
 * @property motherTongue - Preferred mother tongue of the partner.
 * @property diet - Preferred diet of the partner.
 * @property educations - Preferred education levels of the partner.
 * @property occupations - Preferred occupations of the partner.
 * @property minIncome - Minimum preferred income of the partner.
 * @property maxIncome - Maximum preferred income of the partner.
 * @property cities - Preferred cities for the partner.
 * @property states - Preferred states for the partner.
 * @property countries - Preferred countries for the partner.
 */
export type UpdatePartnerPreferencesRequest = {
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  gender: string;
  maritalStatuses: string;
  religions: string;
  castes: string;
  motherTongue: string;
  diet: string;
  educations: string;
  occupations: string;
  minIncome: number;
  maxIncome: number;
  cities: string;
  states: string;
  countries: string;
};

/**
 * Checks whether the provided user profile is complete.
 *
 * @param userProfile - The user profile to check for completeness.
 * @returns `true` if all required fields are present and not `null`, otherwise `false`.
 */
export const isProfileComplete = (userProfile?: UserProfile): boolean => {
  if (!userProfile) return false;
  const isComplete =
    userProfile.fullName !== null &&
    userProfile.dateOfBirth !== null &&
    userProfile.gender !== null &&
    userProfile.city !== null &&
    userProfile.state !== null &&
    userProfile.pincode !== null &&
    userProfile.aboutMe !== null &&
    userProfile.diet !== null &&
    userProfile.height !== null &&
    userProfile.weight !== null &&
    userProfile.religion !== null &&
    userProfile.caste !== null &&
    userProfile.motherTongue !== null &&
    userProfile.maritalStatus !== null &&
    userProfile.education !== null &&
    userProfile.occupation !== null &&
    userProfile.annualIncome !== null &&
    userProfile.primaryPhotoUrl !== null;
  return isComplete;
};

/**
 * Checks whether all required fields in the given partner preferences object are complete (not null).
 *
 * @param partnerPreferences - The partner preferences object to validate.
 * @returns `true` if all required fields are present and not null, otherwise `false`.
 */
export const isPartnerPreferencesComplete = (
  partnerPreferences?: PartnerPreferences,
): boolean => {
  if (!partnerPreferences) return false;
  const isComplete =
    partnerPreferences.minAge !== null &&
    partnerPreferences.maxAge !== null &&
    partnerPreferences.minHeight !== null &&
    partnerPreferences.maxHeight !== null &&
    partnerPreferences.minIncome !== null &&
    partnerPreferences.maxIncome !== null &&
    partnerPreferences.maritalStatuses !== null &&
    partnerPreferences.religions !== null &&
    partnerPreferences.castes !== null &&
    partnerPreferences.motherTongue !== null &&
    partnerPreferences.diet !== null &&
    partnerPreferences.educations !== null &&
    partnerPreferences.occupations !== null &&
    partnerPreferences.minIncome !== null &&
    partnerPreferences.maxIncome !== null &&
    partnerPreferences.cities !== null &&
    partnerPreferences.states !== null &&
    partnerPreferences.countries !== null &&
    partnerPreferences.gender !== null;
  return isComplete;
};
