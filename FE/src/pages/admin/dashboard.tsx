import DailyRevenueChart from "./Statistical/DailyRevenueTable";
import List5Pro from "./Statistical/List5Pro";
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";
import NewOrder from "./Statistical/NewOrder";
import OrderDashboard from "./Statistical/OrderDashboard";

const Dashboard = () => {
  return (
    <div>
      <OrderDashboard />
      <NewOrder />
      <DailyRevenueChart />
      <MonthlyRevenueTable />
      <List5Pro />
    </div>
  );
};

export default Dashboard;
