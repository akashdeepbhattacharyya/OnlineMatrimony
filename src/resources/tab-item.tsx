import AiMatchesIcon from '@/assets/images/tab-icon-ai-matches.svg'; //'../assets/images/tab-icon-ai-matches.svg';
import HomeIcon from '@/assets/images/tab-icon-home.svg';
import SearchIcon from '@/assets/images/tab-icon-search.svg';
import SettingsIcon from '@/assets/images/tab-icon-settings.svg';
import ChatIcon from '@/assets/images/tab-icon-chat.svg';

export type TabItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  route: string;
};

export const tabItems: TabItem[] = [
  { key: 'Home', label: 'Home', icon: <HomeIcon />, route: 'Home' },
  {
    key: 'AI Matches',
    label: 'AI Matches',
    icon: <AiMatchesIcon />,
    route: 'AiMatches',
  },
  { key: 'Chat', label: 'Chat', icon: <ChatIcon />, route: 'Chat' },
  { key: 'Search', label: 'Search', icon: <SearchIcon />, route: 'Search' },
  {
    key: 'Settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    route: 'Settings',
  },
];
