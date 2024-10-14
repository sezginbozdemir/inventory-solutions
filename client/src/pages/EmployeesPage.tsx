import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import EmployeeTable from "../components/tables/EmployeeTable";

const EmployeesPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
        <Anchor href="#employees">Employees</Anchor>
      </Breadcrumbs>
      <EmployeeTable />
    </>
  );
};

export default EmployeesPage;
