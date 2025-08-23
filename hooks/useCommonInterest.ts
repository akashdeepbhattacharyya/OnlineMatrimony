import { UserProfile } from '../models/User';
import { Caste } from '../resources/caste';
import { City } from '../resources/city-state';
import { Diet } from '../resources/diet';
import { Education } from '../resources/education';
import { MotherTongue } from '../resources/mother-tongue';
import { Occupation } from '../resources/occupation';

export type CommonInterest = {
  diet?: Diet;
  city?: City;
  caste?: Caste;
  motherTongue?: MotherTongue;
  education?: Education;
  occupation?: Occupation;
};

export const useCommonInterest = (
  matchedUserProfile: UserProfile,
  currentUserProfile: UserProfile,
) => {
  const isSameDiet =
    matchedUserProfile.diet !== undefined &&
    currentUserProfile.diet !== undefined &&
    matchedUserProfile.diet === currentUserProfile.diet;
  const isSameCity =
    matchedUserProfile.city !== undefined &&
    currentUserProfile.city !== undefined &&
    matchedUserProfile.city === currentUserProfile.city;
  const isSameCaste =
    matchedUserProfile.caste !== undefined &&
    currentUserProfile.caste !== undefined &&
    matchedUserProfile.caste === currentUserProfile.caste;
  const isSameMotherTongue =
    matchedUserProfile.motherTongue !== undefined &&
    currentUserProfile.motherTongue !== undefined &&
    matchedUserProfile.motherTongue === currentUserProfile.motherTongue;
  const isSameEducation =
    matchedUserProfile.education !== undefined &&
    currentUserProfile.education !== undefined &&
    matchedUserProfile.education === currentUserProfile.education;
  const isSameOccupation =
    matchedUserProfile.occupation !== undefined &&
    currentUserProfile.occupation !== undefined &&
    matchedUserProfile.occupation === currentUserProfile.occupation;

  const commonInterest: CommonInterest = {
    diet: isSameDiet ? matchedUserProfile.diet : undefined,
    city: isSameCity ? matchedUserProfile.city : undefined,
    caste: isSameCaste ? matchedUserProfile.caste : undefined,
    motherTongue: isSameMotherTongue
      ? matchedUserProfile.motherTongue
      : undefined,
    education: isSameEducation ? matchedUserProfile.education : undefined,
    occupation: isSameOccupation ? matchedUserProfile.occupation : undefined,
  };

  return commonInterest;
};
