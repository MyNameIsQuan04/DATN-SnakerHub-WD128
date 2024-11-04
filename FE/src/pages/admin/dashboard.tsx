import DailyRevenueTable from "./Statistical/DailyRevenueTable";
import MonthlyRevenueTable from "./Statistical/MonthlyRevenueTable";

const Dashboard = () => {
  return (
    <div>
      <DailyRevenueTable />
      <MonthlyRevenueTable />
    </div>
  );
};

export default Dashboard;
