export interface TopCard {
  id: string | number;
  icon: string;
  title: string;
  count: string | number;
  iconColor: string;
  iconBg: string;
}

export const topCardsData: TopCard[] = [
  {
    id: 1,
    icon: 'mage:heart-fill',
    title: 'Total Interns',
    count: '100,000+',
    iconColor: 'secondary.main',
    iconBg: 'transparent.secondary.main',
  },
  {
    id: 2,
    icon: 'solar:gamepad-old-bold',
    title: 'Avg Ai Score',
    count: 78,
    iconColor: 'warning.main',
    iconBg: 'transparent.warning.main',
  },
  {
    id: 3,
    icon: 'solar:bag-4-bold',
    title: 'Data points collected',
    count: '400,000',
    iconColor: 'error.light',
    iconBg: 'transparent.error.light',
  },
  {
    id: 4,
    icon: 'heroicons:briefcase-20-solid',
    title: 'Avg streak',
    count: 12,
    iconColor: 'primary.main',
    iconBg: 'transparent.primary.main',
  },
];
