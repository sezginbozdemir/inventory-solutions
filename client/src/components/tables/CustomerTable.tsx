import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { chunk } from "lodash";
import { FaPlus, FaTrash, FaRegEdit } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import {
  Input,
  Button,
  Table,
  Checkbox,
  Box,
  Pagination,
  Loader,
  Paper,
} from "@mantine/core";
import AddCustomerModal from "./../modals/addCustomerModal";
import EditCustomerModal from "./../modals/editCustomerModal";
import { useDisclosure } from "@mantine/hooks";
import useCustomerTable from "../../hooks/useCustomerTable";
import {
  fetchCustomers,
  selectFilteredCustomers,
} from "../../store/features/CustomerSlice";

const CustomerTable: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [activePage, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.customers.loading);
  const customers = useAppSelector(selectFilteredCustomers);

  const customersPerPage = 10;
  const totalPages = Math.ceil(customers.length / customersPerPage);
  const customerPages = chunk(customers, customersPerPage);
  const currentCustomers = customerPages[activePage - 1] || [];

  const {
    selectedRows,
    setSelectedRows,
    searchValue,
    setSearchValue,
    errorMessage,
    handleSearch,
    handleDeleteSelected,
  } = useCustomerTable();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCloseEditModal = () => {
    closeEditModal();
    setSelectedRows([]);
    dispatch(fetchCustomers());
  };
  const isAllSelected =
    currentCustomers.length > 0 &&
    selectedRows.length === currentCustomers.length;

  const rows = currentCustomers.map((customer) => (
    <Table.Tr
      key={customer._id}
      bg={
        selectedRows.includes(customer._id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(customer._id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, customer._id]
                : selectedRows.filter((position) => position !== customer._id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <IoPersonSharp size={20} />
      </Table.Td>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td>{customer.company}</Table.Td>
      <Table.Td>{customer.adress}</Table.Td>
      <Table.Td>{customer.phone}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper className="m-5 mb-3 rounded" p="xs">
        <Box className="flex justify-between mr-3 ml-3 mt-5">
          <form className="ml-2 w-1/4" onSubmit={handleSearch}>
            <Input.Wrapper
              description="Search for customers."
              error={errorMessage}
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Customer name"
              />
            </Input.Wrapper>
            <Button type="submit" className="hidden"></Button>
          </form>
          <Box className="flex">
            {selectedRows.length > 0 && (
              <Box className="mr-3">
                {selectedRows.length === 1 && (
                  <Button
                    className="mr-3"
                    color="cyan"
                    mt="md"
                    onClick={openEditModal}
                  >
                    <FaRegEdit />
                  </Button>
                )}

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
            <EditCustomerModal
              customer={
                customers.find((p) => p._id === selectedRows[0]) || null
              }
              opened={editModalOpened}
              onClose={handleCloseEditModal}
            />
            <Button
              leftSection={<FaPlus />}
              className="mr-5"
              justify="center"
              variant="default"
              mt="md"
              onClick={openAddModal}
            >
              Create customer
            </Button>
          </Box>
        </Box>
        <AddCustomerModal opened={addModalOpened} onClose={closeAddModal} />
        <Box className="mt-3 border-t border-black-500">
          <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    aria-label="Select all rows"
                    checked={isAllSelected}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setSelectedRows(
                          currentCustomers.map((customer) => customer._id)
                        );
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </Table.Th>
                <Table.Th c="dimmed"></Table.Th>
                <Table.Th c="dimmed">Customer name</Table.Th>
                <Table.Th c="dimmed">Company</Table.Th>
                <Table.Th c="dimmed">Adress</Table.Th>
                <Table.Th c="dimmed">Phone</Table.Th>
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

export default CustomerTable;
