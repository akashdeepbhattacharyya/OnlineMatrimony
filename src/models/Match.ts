import { UserProfile } from './User';

export type Match = {
  id: number;
  userId: number;
  matchedUserId: number;
  status: string;
  matchScore: number;
  matchedAt: string;
  matchedUserProfile: MatchedUserProfile;
  canChat: boolean;
};

export type MatchedUserProfile = {
  email: string;
  phone: string;
} & UserProfile;
