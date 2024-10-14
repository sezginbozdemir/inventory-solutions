import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  fetchOrders,
  editOrder,
  removeOrder,
  selectFilteredOrders,
  setFilter,
} from "../store/features/OrderSlice";
import { notifications } from "@mantine/notifications";
import { Order } from "../api/useOrderApi";

const useOrderTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectFilteredOrders);
  const statusOptions = [
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Canceled", label: "Canceled" },
  ];
  const toggleRow = (id: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const orderToUpdate = orders.find((order) => order._id === orderId);

    if (orderToUpdate) {
      const updatedOrder: Order = {
        ...orderToUpdate,
        status: newStatus,
        customerId: orderToUpdate.customerId!,
        products: orderToUpdate.products || [],
        orderId: orderToUpdate.orderId || "",
        orderDate: orderToUpdate.orderDate || new Date().toLocaleDateString(),
      };

      const result = await dispatch(
        editOrder({ id: orderId, order: updatedOrder })
      );

      if (editOrder.fulfilled.match(result)) {
        notifications.show({
          title: "Status Updated",
          message: "Status of order have been changed successfully!",
          color: "green",
          autoClose: 3000,
        });

        dispatch(fetchOrders());
      }
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilter(searchValue));
    const filteredOrders = orders.filter((order) =>
      order.orderId.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredOrders.length === 0
      ? setErrorMessage("No orders found.")
      : setErrorMessage("");
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((order) => {
      dispatch(removeOrder(order));
    });
    notifications.show({
      title: "Order Deleted",
      message: "Selected orders have been deleted successfully!",
      color: "green",
      autoClose: 3000,
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
    setExpandedRows,
    toggleRow,
  };
};

export default useOrderTable;
