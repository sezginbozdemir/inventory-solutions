import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  removeCustomer,
  selectFilteredCustomers,
  setFilter,
} from "../store/features/CustomerSlice";
import { notifications } from "@mantine/notifications";

const useCustomerTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const customers = useAppSelector(selectFilteredCustomers);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilter(searchValue));
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredCustomers.length === 0
      ? setErrorMessage("No customers found.")
      : setErrorMessage("");
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((customerId) => {
      dispatch(removeCustomer(customerId));
    });
    notifications.show({
      title: "Customer Deleted",
      message: "Selected customers have been deleted successfully!",
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
  };
};

export default useCustomerTable;
