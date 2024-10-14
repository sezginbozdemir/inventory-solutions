import React from "react";
import OrderTable from "../components/tables/OrderTable";
import { Breadcrumbs, Anchor } from "@mantine/core";

const OrdersPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
        <Anchor href="#orders">Orders</Anchor>
      </Breadcrumbs>
      <OrderTable />
    </>
  );
};

export default OrdersPage;
