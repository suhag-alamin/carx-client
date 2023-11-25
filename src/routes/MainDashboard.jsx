import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import MyOrders from "@/pages/Dashboard/User/MyOrders";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const { admin } = useSelector((state) => state.auth);

  return <>{admin.isAdmin ? <ManageAllOrders /> : <MyOrders />}</>;
};

export default MainDashboard;
