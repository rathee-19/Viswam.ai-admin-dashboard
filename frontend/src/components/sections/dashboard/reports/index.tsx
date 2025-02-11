import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReportsChart from './ReportsChart';
import ActionMenu from 'components/common/ActionMenu';
import { fetchTopPointEarners } from 'services/api';

const actions = [
  { id: 1, icon: 'mage:refresh', title: 'Refresh' },
  { id: 2, icon: 'solar:export-linear', title: 'Export' },
  { id: 3, icon: 'mage:share', title: 'Share' },
];

// Define Type for API response
interface TopPointEarner {
  name: string;
  total_points: number;
}

const Reports = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const earners: TopPointEarner[] = await fetchTopPointEarners();
        const totalPoints = earners.reduce((sum: number, e: TopPointEarner) => sum + e.total_points, 0);
        setData(Array(11).fill(totalPoints / 11)); // Example distribution
      } catch (error) {
        console.error('Failed to fetch total data collected', error);
      }
    };

    loadData();
  }, []);

  return (
    <Paper sx={{ pr: 0, height: 410 }}>
      <Stack mt={-0.5} pr={3.5} alignItems="center" justifyContent="space-between">
        <Typography variant="h6" color="text.secondary">
          Reports
        </Typography>
        <ActionMenu actions={actions} />
      </Stack>

      <ReportsChart data={data} sx={{ height: '320px !important' }} />
    </Paper>
  );
};

export default Reports;
