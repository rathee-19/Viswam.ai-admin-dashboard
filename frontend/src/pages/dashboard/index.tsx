import Grid from '@mui/material/Grid';
import Analytics from 'components/sections/dashboard/analytics';
// import RecentOrders from 'components/sections/dashboard/recent-orders';
import Reports from 'components/sections/dashboard/reports';
import TopCards from 'components/sections/dashboard/top-cards';
// import TopSelling from 'components/sections/dashboard/top-selling';
import Table from 'components/sections/dashboard/recent-orders/table';
import Table2 from 'components/sections/dashboard/recent-orders/table2';
import Table3 from 'components/sections/dashboard/recent-orders/table3';

const Dashboard = () => {
  return (
    <Grid container px={3.75} spacing={3.75}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
      <Grid item xs={12} md={7}>
        <Reports />
      </Grid>
      <Grid item xs={12} md={5}>
        <Analytics />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <RecentOrders />
      </Grid> */}
      <Grid item xs={2} md={4}>
        <Table />
      </Grid>
      <Grid item xs={2} md={4}>
        <Table2 />
      </Grid>
      <Grid item xs={2} md={4}>
        <Table3 />
      </Grid>
      {/* <Grid item xs={12} md={5}>
        <TopSelling />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
