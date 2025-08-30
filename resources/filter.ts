export const chatFilter = {
  ALL: 'All',
  UNREAD: 'Unread',
};

export type ChatFilter = keyof typeof chatFilter;

export const matchFilter = {
  MATCH: 'My Matches',
  SENT: 'Sent',
  RECEIVED: 'Received',
};

export type MatchFilter = keyof typeof matchFilter;