import React, { useEffect } from "react";
import { Box, Text, Progress, ScrollArea } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { fetchOrders } from "../../store/features/OrderSlice";
import { Customer } from "../../api/useCustomerApi";
import { Order } from "../../api/useOrderApi";

interface OrderCount {
  [key: string]: number; // Index signature for dynamic customer IDs
}

const TopClientsChart: React.FC = () => {
  const customers: Customer[] = useAppSelector(
    (state) => state.customers.customers
  );
  const orders: Order[] = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orderCounts: OrderCount = orders.reduce<OrderCount>((acc, order) => {
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
