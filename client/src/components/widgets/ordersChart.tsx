import React from "react";
import useFilteredWidgets from "../../hooks/useFilteredWidgets";
import { Paper, Title, Select } from "@mantine/core";
import { LineChart } from "@mantine/charts";

const OrdersChart: React.FC = () => {
  const {
    availableYears,
    selectedYear,
    setSelectedYear,
    filteredOrders,
    allMonths,
  } = useFilteredWidgets();

  const getOrdersCountByMonth = () => {
    const counts: { [key: string]: number } = {};

    filteredOrders.forEach((order) => {
      const dateParts = order.orderDate.split("/");
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      const month = date.toLocaleString("default", { month: "long" });
      counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts)
      .sort(
        ([monthA], [monthB]) =>
          allMonths.indexOf(monthA) - allMonths.indexOf(monthB)
      )
      .map(([month, sale]) => ({ month, sale }));
  };

  const ordersCountByMonth = getOrdersCountByMonth();

  return (
    <>
      <Paper className="m-5 p-5">
        <Select
          label="Filter by year"
          c="dimmed"
          variant="unstyled"
          data={availableYears.map((year) => ({ value: year, label: year }))}
          value={selectedYear}
          onChange={setSelectedYear}
          className="w-24 mb-10"
        />

        {ordersCountByMonth.length > 0 ? (
          <LineChart
            h={300}
            data={ordersCountByMonth}
            dataKey="month"
            series={[{ name: "sale", label: "Orders", color: "cyan.6" }]}
          />
        ) : (
          <Title order={4}>No orders available for this period.</Title>
        )}
      </Paper>
    </>
  );
};

export default OrdersChart;
