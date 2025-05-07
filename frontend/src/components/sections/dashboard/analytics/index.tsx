import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ActionMenu from 'components/common/ActionMenu';
import AnalyticsChart from './AnalyticsChart';
import { fetchTopDataCategories } from 'services/api'; // Create this API function

const actions = [
  { id: 1, icon: 'mage:refresh', title: 'Refresh' },
  { id: 2, icon: 'solar:export-linear', title: 'Export' },
  { id: 3, icon: 'mage:share', title: 'Share' },
];

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<{ id: number; value: number; name: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchTopDataCategories(); // Call API
        const formattedData = response.categories.map((item: { name: string; value: number }, index: number) => ({
          id: index + 1,
          value: item.value,
          name: item.name,
        }));

        setAnalyticsData(formattedData);
      } catch (error) {
        console.error('Failed to fetch category data', error);
      }
    };

    loadData();
  }, []);

  return (
    <Paper sx={{ px: 0, height: 410 }}>
      <Stack mt={-3} px={3.75} alignItems="center" justifyContent="space-between">
        <Typography variant="h6" color="text.secondary" zIndex={1000}>
          Analytics
        </Typography>

        <ActionMenu actions={actions} />
      </Stack>

      <AnalyticsChart data={analyticsData} sx={{ mt: -7.5, mx: 'auto', width: 300, height: '400px !important' }} />
    </Paper>
  );
};

export default Analytics;
