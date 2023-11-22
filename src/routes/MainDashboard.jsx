import React from "react";
import useAuth from "@/hooks/useAuth";
import ManageAllOrders from "@/pages/Dashboard/ManageAllOrders/ManageAllOrders";
import MyOrders from "@/pages/Dashboard/MyOrders/MyOrders";

const MainDashboard = () => {
  const { admin } = useAuth();

  return <>{admin ? <ManageAllOrders /> : <MyOrders />}</>;
};

export default MainDashboard;
