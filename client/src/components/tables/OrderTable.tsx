import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { chunk } from "lodash";
import { FaPlus, FaTrash, FaBoxOpen } from "react-icons/fa";
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
  NumberFormatter,
  Paper,
} from "@mantine/core";
import AddOrderModal from "./../modals/addOrderModal";
import { useDisclosure } from "@mantine/hooks";
import useOrderTable from "../../hooks/useOrderTable";
import {
  fetchOrders,
  selectFilteredOrders,
} from "../../store/features/OrderSlice";

const OrderTable: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const [activePage, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.orders.loading);
  const orders = useAppSelector(selectFilteredOrders);

  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const orderPages = chunk(orders, ordersPerPage);
  const currentOrders = orderPages[activePage - 1] || [];

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
    toggleRow,
    expandedRows,
  } = useOrderTable();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const rows = currentOrders.map((order) => {
    const isExpanded = expandedRows.includes(order._id);
    const orderDate = order.orderDate!;

    return (
      <>
        <Table.Tr
          key={order._id}
          onClick={() => toggleRow(order._id)}
          style={{ cursor: "pointer" }}
          bg={
            selectedRows.includes(order._id)
              ? "var(--mantine-color-blue-light)"
              : undefined
          }
        >
          <Table.Td onClick={(e) => e.stopPropagation()}>
            <Checkbox
              aria-label="Select row"
              checked={selectedRows.includes(order._id)}
              onChange={(event) =>
                setSelectedRows(
                  event.currentTarget.checked
                    ? [...selectedRows, order._id]
                    : selectedRows.filter((position) => position !== order._id)
                )
              }
            />
          </Table.Td>
          <Table.Td>
            <FaBoxOpen size={20} />
          </Table.Td>
          <Table.Td>{order.orderId}</Table.Td>
          <Table.Td>{order.customerId.name}</Table.Td>
          <Table.Td>{orderDate}</Table.Td>
          <Table.Td onClick={(e) => e.stopPropagation()}>
            <Select
              className="max-w-40"
              value={order.status}
              onChange={(value) => handleStatusChange(order._id, value!)}
              data={statusOptions}
            />
          </Table.Td>
          <Table.Td>
            <IoIosArrowDown />
          </Table.Td>
        </Table.Tr>
        {isExpanded && (
          <Table.Tr key={order._id}>
            <Table.Td colSpan={7}>
              <Box className="p-4">
                <Table
                  highlightOnHover
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Product Name</Table.Th>
                      <Table.Th>Sale Price</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {order.products.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>{item.productId.name}</Table.Td>
                        <Table.Td>
                          <NumberFormatter
                            prefix="$"
                            value={item.productId.salePrice}
                            thousandSeparator
                          />
                        </Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>
                          <NumberFormatter
                            prefix="$"
                            value={item.productId.salePrice! * item.quantity!}
                            thousandSeparator
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>

                  <Table.Tfoot>
                    <Table.Tr>
                      <Table.Td colSpan={4} className="text-right font-bold">
                        Total:
                      </Table.Td>
                      <Table.Td>
                        <NumberFormatter
                          prefix="$"
                          value={order.products.reduce((acc, item) => {
                            const itemTotal =
                              item.productId.salePrice! * item.quantity!;
                            return acc + itemTotal;
                          }, 0)}
                          thousandSeparator
                        />
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tfoot>
                </Table>
              </Box>
            </Table.Td>
          </Table.Tr>
        )}
      </>
    );
  });

  const isAllSelected =
    currentOrders.length > 0 && selectedRows.length === currentOrders.length;

  return (
    <>
      <Paper className="m-5 mb-3 rounded" p="xs">
        <Box className="flex justify-between mr-3 ml-3 mt-5">
          <form className="ml-2 w-1/4" onSubmit={handleSearch}>
            <Input.Wrapper
              description="Search for orders."
              error={errorMessage}
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Order ID"
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
              onClick={openAddModal}
            >
              Create order
            </Button>
          </Box>
        </Box>
        <AddOrderModal opened={addModalOpened} onClose={closeAddModal} />
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
                          currentOrders.map((order) => order._id)
                        );
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </Table.Th>

                <Table.Th></Table.Th>
                <Table.Th c="dimmed">Order ID</Table.Th>
                <Table.Th c="dimmed">Client</Table.Th>
                <Table.Th c="dimmed">Date</Table.Th>
                <Table.Th c="dimmed">Status</Table.Th>
                <Table.Th></Table.Th>
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

export default OrderTable;
