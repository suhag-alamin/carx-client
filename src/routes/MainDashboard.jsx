import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import MyOrders from "@/pages/Dashboard/User/MyOrders";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const { admin } = useSelector((state) => state.auth);
  console.log(admin);

  return <>{admin.isAdmin ? <ManageAllOrders /> : <MyOrders />}</>;
};

export default MainDashboard;
