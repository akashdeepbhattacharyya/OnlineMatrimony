export const chatFilter = {
  ALL: 'All',
  UNREAD: 'Unread',
};

export type ChatFilter = keyof typeof chatFilter;

export const matchFilter = {
  PENDING: 'Pending',
  ACCEPTED: 'Liked',
  REJECTED: 'Disliked',
};

export type MatchFilter = keyof typeof matchFilter;