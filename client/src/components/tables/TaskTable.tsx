import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Table, Loader, Paper, Pagination, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  fetchEmployees,
  editEmployee,
} from "../../store/features/EmployeeSlice";
import userId from "../../utils/tokenData";
import { BiTask } from "react-icons/bi";

const TaskTable: React.FC = () => {
  const [activePage, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.employees.loading);
  const employees = useAppSelector((state) => state.employees.employees);
  const tasksPerPage = 10;

  const employeeId = userId();

  const currentEmployee = employees.find(
    (employee) => employee._id === employeeId
  );

  const tasks = currentEmployee ? currentEmployee.tasks : [];

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const currentTasks = tasks.slice(
    (activePage - 1) * tasksPerPage,
    activePage * tasksPerPage
  );

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const handleStatusChange = async (taskDesc: string, newStatus: string) => {
    if (!currentEmployee) return;

    const updatedTasks = currentEmployee.tasks.map((task) => {
      if (task.description === taskDesc) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    const updatedEmployee = { ...currentEmployee, tasks: updatedTasks };
    const result = await dispatch(
      editEmployee({ id: currentEmployee._id, employee: updatedEmployee })
    );

    if (editEmployee.fulfilled.match(result)) {
      notifications.show({
        title: "Status Updated",
        message: "Task status has been changed successfully!",
        color: "green",
        autoClose: 3000,
      });

      dispatch(fetchEmployees());
    }
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const rows = currentTasks.map((task) => (
    <Table.Tr key={task.description}>
      <Table.Td>
        <BiTask size={20} />
      </Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>{new Date(task.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>{task.dueDate}</Table.Td>
      <Table.Td>
        <Select
          className="max-w-40"
          value={task.status}
          onChange={(value) => handleStatusChange(task.description, value!)}
          data={statusOptions}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper className="m-5 mb-3 rounded" p="xs">
      <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Description</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "center" }}>
                <Loader size="lg" variant="dots" />
              </Table.Td>
            </Table.Tr>
          ) : rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "center" }}>
                No tasks available.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
        <Table.Caption>End of the list</Table.Caption>
      </Table>
      <Pagination
        className="flex place-content-center mt-3"
        total={totalPages}
        value={activePage}
        onChange={setPage}
        color="cyan"
      />
    </Paper>
  );
};

export default TaskTable;
