import useAuth from "@/hooks/useAuth";
import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import MyOrders from "@/pages/Dashboard/User/MyOrders";

const MainDashboard = () => {
  const { admin } = useAuth();

  return <>{admin ? <ManageAllOrders /> : <MyOrders />}</>;
};

export default MainDashboard;
