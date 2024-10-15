import React from "react";
import { Paper, Text, Group, Select } from "@mantine/core";
import { TfiDropbox } from "react-icons/tfi";
import useFilteredWidgets from "../../hooks/useFilteredWidgets";

const OrderTotal: React.FC = () => {
  const {
    availableYears,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    filteredOrders,
    allMonths,
  } = useFilteredWidgets();

  return (
    <Paper className="h-60 w-1/6 flex flex-col rounded justify-between items-center p-2">
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

      <TfiDropbox size={40} color="var(--mantine-color-blue-filled)" />

      <Text c="dimmed">Total Orders </Text>

      <Text
        className="text-2xl"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 179 }}
      >
        {filteredOrders.length}
      </Text>
    </Paper>
  );
};

export default OrderTotal;
