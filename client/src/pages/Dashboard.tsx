import React, { useEffect } from "react";
import { Breadcrumbs, Anchor, Group } from "@mantine/core";
import OrdersChart from "../components/widgets/ordersChart";
import OrderTotal from "../components/widgets/orderTotal";
import OrderRevenue from "../components/widgets/orderRevenue";
import OrderEarnings from "../components/widgets/orderEarnings";
import TopSelling from "../components/widgets/topSelling";
import TotalBudget from "../components/widgets/totalBudget";
import FutureEarnings from "../components/widgets/futureEarnings";
import LowStock from "../components/widgets/lowStock";
import OutStock from "../components/widgets/outStock";
import { fetchOrders } from "../store/features/OrderSlice";
import { fetchProducts } from "../store/features/ProductSlice";
import { useAppDispatch } from "../store/store";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
      </Breadcrumbs>
      <Group gap="xs" className="ml-5 mr-5 flex justify-between">
        <OrderTotal />
        <OrderRevenue />
        <OrderEarnings />
        <TotalBudget />
        <FutureEarnings />
      </Group>

      <OrdersChart />
      <TopSelling />
      <Group gap="xs" className="ml-5 mr-5 flex-col">
        <LowStock />
        <OutStock />
      </Group>
    </>
  );
};

export default Dashboard;
