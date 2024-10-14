import React from "react";
import { Paper, Text, Group, Select, NumberFormatter } from "@mantine/core";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import useFilteredWidgets from "../../hooks/useFilteredWidgets";

const OrderEarnings: React.FC = () => {
  const {
    filteredOrders,
    availableYears,
    selectedYear,
    setSelectedYear,
    allMonths,
    selectedMonth,
    setSelectedMonth,
  } = useFilteredWidgets();

  const totalOrderEarnings = filteredOrders.reduce((total, order) => {
    const orderTotal = order.products.reduce((sum, product) => {
      return sum + product.productId.salePrice! - product.productId.entryPrice!;
    }, 0);
    return total + orderTotal;
  }, 0);

  return (
    <Paper className="h-48 w-1/6 flex flex-col rounded place-content-center items-center p-4">
      <Group className="flex justify-between w-full">
        <Select
          label="Year"
          c="dimmed"
          variant="unstyled"
          data={availableYears.map((year) => ({ value: year, label: year }))}
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          className="w-28"
        />

        <Select
          label="Month"
          c="dimmed"
          variant="unstyled"
          data={allMonths.map((month) => ({ value: month, label: month }))}
          value={selectedMonth}
          onChange={(value) => setSelectedMonth(value)}
          className="w-28"
        />
      </Group>

      <FaMoneyBillTrendUp size={40} color="var(--mantine-color-blue-filled)" />

      <Text c="dimmed">Total Earnings</Text>

      <Text
        className="text-2xl"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 179 }}
      >
        <NumberFormatter
          prefix="$"
          value={totalOrderEarnings}
          thousandSeparator
        />
      </Text>
    </Paper>
  );
};

export default OrderEarnings;