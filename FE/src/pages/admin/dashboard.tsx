
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";
import OrderDashboard from "./Statistical/OrderDashboard";

const Dashboard = () => {
  return (
    <div>
      <OrderDashboard/>
      <MonthlyRevenueTable />
    </div>
  );
};

export default Dashboard;
