import DashboardChart from "./Statistical/Chart";
import DailyRevenueTable from "./Statistical/DailyRevenueTable";
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";

const Dashboard = () => {
  return (
    <div>
      <DailyRevenueTable />
      <MonthlyRevenueTable />
      <DashboardChart />
    </div>
  );
};

export default Dashboard;
