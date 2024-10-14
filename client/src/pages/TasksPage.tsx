import React from "react";
import TaskTable from "../components/tables/TaskTable";
import { Breadcrumbs, Anchor } from "@mantine/core";

const TasksPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
        <Anchor href="#tasks">Orders</Anchor>
      </Breadcrumbs>
      <TaskTable />
    </>
  );
};

export default TasksPage;
