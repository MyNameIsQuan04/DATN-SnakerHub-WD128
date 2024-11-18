import DashboardChart from "./Statistical/Chart";
import DailyRevenueTable from "./Statistical/DailyRevenueTable";
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";
import OrderStatistics from "./Statistical/OrderStatistics";

const Dashboard = () => {
  return (
    <div>
      <DailyRevenueTable />
      <MonthlyRevenueTable />
      <DashboardChart />
      <OrderStatistics />
    </div>
  );
};

export default Dashboard;
