import { UserProfile } from './User';

export type Match = {
  id: number;
  matchScore: number;
  profileResponse: MatchedUserProfile;
};

export type MatchedUserProfile = {
  id: number;
} & UserProfile;
