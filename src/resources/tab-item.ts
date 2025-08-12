export type TabItem = {
  key: string;
  label: string;
  route: string;
};

export const tabItems: TabItem[] = [
  { key: 'Home', label: 'Home', route: 'Home' },
  {
    key: 'Matches',
    label: 'Matches',
    route: 'Matches',
  },
  { key: 'Chat', label: 'Chat', route: 'Chat' },
  { key: 'Search', label: 'Search', route: 'Search' },
  {
    key: 'Settings',
    label: 'Settings',
    route: 'Settings',
  },
];
