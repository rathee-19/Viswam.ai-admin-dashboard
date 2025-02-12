import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { fetchRecentActivities } from 'services/api';
import { getUsers } from 'services/api';

interface Activity {
  name: string;
  activity: string;
  timestamp: string;
}

const RecentActivitiesTable = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [users, setUsers] =useState<string | null>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // const data = await fetchRecentActivities(); // Fetch the data from the API
        const data = await getUsers();
        // console.log("this is the data form get_users api", data);
        setActivities(data);
      } catch (err) {
        setError('Failed to load recent activities');
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  // setUsers("users");

  return (
    <Paper sx={{ height: { xs: 418, sm: 370 }, overflow: 'hidden' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        mt={-0.5}
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" color="text.secondary">
          Recent Activities
        </Typography>
      </Stack>

      <Box mt={{ xs: 1.5, sm: 0.75 }} height={305} flex={1}>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    {/* <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Paper>
  );
};

export default RecentActivitiesTable;
