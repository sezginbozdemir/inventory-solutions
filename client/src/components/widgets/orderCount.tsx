import React, { useEffect } from "react";
import { Box, Text, Progress, ScrollArea } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { fetchOrders } from "../../store/features/OrderSlice";

const TopClientsChart: React.FC = () => {
  const customers = useAppSelector((state) => state.customers.customers);
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orderCounts = orders.reduce((acc, order) => {
    const { customerId } = order;
    if (!acc[customerId._id]) {
      acc[customerId._id] = 0;
    }
    acc[customerId._id] += 1;
    return acc;
  }, {});

  const customersWithOrders = customers.map((customer) => ({
    ...customer,
    orders: orderCounts[customer._id] || 0,
  }));

  const sortedCustomers = customersWithOrders.sort(
    (a, b) => b.orders - a.orders
  );

  const maxOrders = Math.max(...sortedCustomers.map((c) => c.orders)) * 1.5;

  return (
    <>
      <ScrollArea>
        {sortedCustomers.map((customer) => (
          <Box key={customer._id} className="mb-3">
            <Text size="sm">{customer.name}</Text>
            <Progress
              value={(customer.orders / maxOrders) * 100}
              color="blue"
            />
            <Text size="xs" c="dimmed">
              {customer.orders} orders
            </Text>
          </Box>
        ))}
      </ScrollArea>
    </>
  );
};

export default TopClientsChart;
