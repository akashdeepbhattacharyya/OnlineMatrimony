import { UserProfile } from './User';

export type Match = {
  matchId: string;
  userId: number;
  matchScore: number;
  matchStatus: string;
  profileResponse: MatchedUserProfile;
};

export type MatchedUserProfile = {
  userId: number;
} & UserProfile;

export type SentMatch = {
  matchId: string;
  profile: MatchedUserProfile;
};

export type ReceivedMatch = SentMatch;

export type MutualMatch = MatchedUserProfile;
