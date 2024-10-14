import React from "react";
import CustomerTable from "../components/tables/CustomerTable";
import CustomerWidgets from "../components/widgets/customerWidgets";
import { Breadcrumbs, Anchor } from "@mantine/core";

const CustomersPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
        <Anchor href="#customers">Customers</Anchor>
      </Breadcrumbs>
      <CustomerWidgets />
      <CustomerTable />
    </>
  );
};

export default CustomersPage;
