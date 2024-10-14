import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  editEmployee,
  fetchEmployees,
  removeEmployee,
  selectFilteredEmployees,
  setFilter,
} from "../store/features/EmployeeSlice";
import { notifications } from "@mantine/notifications";
import { Employee } from "../api/useEmployeeApi";

const useEmployeeTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const employees = useAppSelector(selectFilteredEmployees);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const toggleRow = (id: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };
  const handleStatusChange = async (employeeId: string, newStatus: string) => {
    const employeeToUpdate = employees.find(
      (employee) => employee._id === employeeId
    );

    if (employeeToUpdate) {
      const updatedEmployee: Employee = {
        ...employeeToUpdate,
        active: newStatus,
        phone: employeeToUpdate.phone,
        name: employeeToUpdate.name,
        email: employeeToUpdate.email,
        password: employeeToUpdate.password,
      };

      const result = await dispatch(
        editEmployee({ id: employeeId, employee: updatedEmployee })
      );

      if (editEmployee.fulfilled.match(result)) {
        notifications.show({
          title: "Status Updated",
          message: "Status of employee have been changed successfully!",
          color: "green",
          autoClose: 3000,
        });

        dispatch(fetchEmployees());
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilter(searchValue));
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredEmployees.length === 0
      ? setErrorMessage("No employees found.")
      : setErrorMessage("");
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((employeeId) => {
      dispatch(removeEmployee(employeeId));
    });
    notifications.show({
      title: "Employee Deleted",
      message: "Selected employees have been deleted successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    setSelectedRows([]);
  };

  return {
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
  };
};

export default useEmployeeTable;
