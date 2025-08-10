export const filters = ['All', 'Unread', 'Active', 'Calls'] as const;
export type Filter = (typeof filters)[number];
