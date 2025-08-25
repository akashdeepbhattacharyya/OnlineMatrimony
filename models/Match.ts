import { UserProfile } from './User';

export type Match = {
  matchId: string;
  userId: number;
  matchScore: number;
  matchStatus: string;
  profileResponse: MatchedUserProfile;
};

export type MatchedUserProfile = {
  id: number;
} & UserProfile;
