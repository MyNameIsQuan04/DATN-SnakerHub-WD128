import List5Pro from "./Statistical/List5Pro";
import List5ProStock from "./Statistical/List5ProStock";
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";
import NewOrder from "./Statistical/NewOrder";
import OrderDashboard from "./Statistical/OrderDashboard";

const Dashboard = () => {
  return (
    <div>
      <OrderDashboard />
      <MonthlyRevenueTable />
      <div className="flex p-4 space-x-4">
        <div className="flex-1">
          <List5Pro />
        </div>
        <div className="flex-1">
          <List5ProStock />
        </div>
      </div>
      <NewOrder />
    </div>
  );
};

export default Dashboard;
