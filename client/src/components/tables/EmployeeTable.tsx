import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { chunk } from "lodash";
import TaskModal from "./../modals/taskModal";
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import {
  Input,
  Button,
  Table,
  Checkbox,
  Box,
  Pagination,
  Loader,
  Select,
  Badge,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useEmployeeTable from "../../hooks/useEmployeeTable";
import {
  fetchEmployees,
  selectFilteredEmployees,
} from "../../store/features/EmployeeSlice";

const EmployeeTable: React.FC = () => {
  const [activePage, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.products.loading);
  const employees = useAppSelector(selectFilteredEmployees);

  const employeesPerPage = 10;
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const employeePages = chunk(employees, employeesPerPage);
  const currentEmployees = employeePages[activePage - 1] || [];

  const {
    selectedRows,
    setSelectedRows,
    searchValue,
    setSearchValue,
    errorMessage,
    handleSearch,
    handleDeleteSelected,
    handleStatusChange,
    statusOptions,
    expandedRows,
    toggleRow,
  } = useEmployeeTable();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const [taskModalOpened, { open: openTaskModal, close: closeTaskModal }] =
    useDisclosure(false);

  const rows = currentEmployees.map((employee) => {
    const isExpanded = expandedRows.includes(employee._id);

    return (
      <>
        <Table.Tr
          key={employee._id}
          onClick={() => {
            if (employee.tasks.length > 0) {
              toggleRow(employee._id);
            }
          }}
          style={{ cursor: "pointer" }}
          bg={
            selectedRows.includes(employee._id)
              ? "var(--mantine-color-blue-light)"
              : undefined
          }
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              onClick={(e) => e.stopPropagation()}
              checked={selectedRows.includes(employee._id)}
              onChange={(event) =>
                setSelectedRows(
                  event.currentTarget.checked
                    ? [...selectedRows, employee._id]
                    : selectedRows.filter(
                        (position) => position !== employee._id
                      )
                )
              }
            />
          </Table.Td>
          <Table.Td>
            <MdSupportAgent size={20} />
          </Table.Td>
          <Table.Td>
            <Badge variant="outline" color="cyan">
              {employee.tasks.length} Tasks
            </Badge>
          </Table.Td>
          <Table.Td>{employee.name}</Table.Td>
          <Table.Td>{employee.phone}</Table.Td>
          <Table.Td>{employee.email}</Table.Td>
          <Table.Td>{employee.role}</Table.Td>
          <Table.Td>
            <Select
              className="max-w-40"
              value={employee.active}
              onClick={(e) => e.stopPropagation()}
              onChange={(value) => handleStatusChange(employee._id, value!)}
              data={statusOptions}
            />
          </Table.Td>
          <Table.Td>
            <IoIosArrowDown size={20} />
          </Table.Td>
        </Table.Tr>
        {isExpanded && (
          <Table.Tr key={employee._id}>
            <Table.Td colSpan={9}>
              <Box className="p-4">
                <Table
                  highlightOnHover
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Created At</Table.Th>
                      <Table.Th>Due Date</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {employee.tasks.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{item.description}</Table.Td>
                        <Table.Td>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td>{item.dueDate}</Table.Td>
                        <Table.Td>{item.status}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>
            </Table.Td>
          </Table.Tr>
        )}
      </>
    );
  });
  const isAllSelected =
    currentEmployees.length > 0 &&
    selectedRows.length === currentEmployees.length;

  return (
    <>
      <Paper className="m-5 mb-3 rounded" p="xs">
        <Box className="flex justify-between mr-3 ml-3 mt-5">
          <form className="ml-2 w-1/4" onSubmit={handleSearch}>
            <Input.Wrapper
              description="Search for products."
              error={errorMessage}
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Employee name"
              />
            </Input.Wrapper>
            <Button type="submit" className="hidden"></Button>
          </form>
          <Box className="flex">
            {selectedRows.length > 0 && (
              <Box className="mr-3">
                <Button
                  color="red"
                  leftSection={<FaTrash />}
                  mt="md"
                  onClick={handleDeleteSelected}
                >
                  ({selectedRows.length})
                </Button>
              </Box>
            )}
            <Button
              leftSection={<FaPlus />}
              className="mr-5"
              justify="center"
              variant="default"
              mt="md"
              onClick={openTaskModal}
            >
              Assign Tasks
            </Button>
          </Box>
        </Box>
        <TaskModal opened={taskModalOpened} onClose={closeTaskModal} />
        <Box className="mt-3 border-t border-black-500">
          <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th c="dimmed">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={isAllSelected}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setSelectedRows(
                          currentEmployees.map((employee) => employee._id)
                        );
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </Table.Th>

                <Table.Th />
                <Table.Th />
                <Table.Th c="dimmed">Name</Table.Th>
                <Table.Th c="dimmed">Phone</Table.Th>
                <Table.Th c="dimmed">Email</Table.Th>
                <Table.Th c="dimmed">Role</Table.Th>
                <Table.Th c="dimmed">Account Status</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="h-72">
              {loading ? (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                    <Loader size="lg" variant="dots" />
                  </Table.Td>
                </Table.Tr>
              ) : (
                rows
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
        </Box>
      </Paper>
    </>
  );
};

export default EmployeeTable;
