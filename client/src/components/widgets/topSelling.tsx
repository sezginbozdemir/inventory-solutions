import React from "react";
import { Paper, Title, Select, Group } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import useFilteredWidgets from "../../hooks/useFilteredWidgets";

const TopSelling: React.FC = () => {
  const {
    availableYears,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    filteredOrders,
    allMonths,
  } = useFilteredWidgets();

  const getProductSalesCount = () => {
    const salesCount: { [key: string]: number } = {};

    filteredOrders.forEach((order) => {
      const products = order.products;
      products.forEach((product) => {
        const productName = product.productId.name;
        const productQuantity = Number(product.quantity);
        salesCount[productName] =
          (salesCount[productName] || 0) + productQuantity;
      });
    });

    return Object.entries(salesCount).map(([name, count]) => ({
      name,
      count,
    }));
  };

  const productSalesData = getProductSalesCount();
  console.log(productSalesData);

  return (
    <Paper className="m-5 p-5">
      <Group className="flex justify-between w-full">
        <Select
          label="Filter by year"
          c="dimmed"
          variant="unstyled"
          data={availableYears.map((year) => ({ value: year, label: year }))}
          value={selectedYear}
          onChange={setSelectedYear}
          className="w-28 mb-10"
        />
        <Select
          label="Filter by month"
          c="dimmed"
          variant="unstyled"
          data={allMonths.map((month) => ({ value: month, label: month }))}
          value={selectedMonth}
          onChange={setSelectedMonth}
          className="w-28 mb-10"
        />
      </Group>

      {productSalesData.length > 0 ? (
        <BarChart
          h={300}
          data={productSalesData}
          dataKey="name"
          withLegend
          series={[{ name: "count", label: "Sold", color: "violet.6" }]}
        />
      ) : (
        <Title order={4}>No products sold for this period.</Title>
      )}
    </Paper>
  );
};

export default TopSelling;
