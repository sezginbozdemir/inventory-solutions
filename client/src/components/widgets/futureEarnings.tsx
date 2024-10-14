import React from "react";
import { Paper, Text, NumberFormatter } from "@mantine/core";
import { FaChartLine } from "react-icons/fa";
import { useAppSelector } from "../../store/store";

const FutureEarnings: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);
  const futureEarnings = products.reduce((total, product) => {
    const salePrice = Number(product.salePrice);
    const inStock = Number(product.inStock);
    const entryPrice = Number(product.entryPrice);
    return total + (salePrice - entryPrice) * inStock;
  }, 0);
  return (
    <Paper className="h-48 w-1/6 flex flex-col rounded place-content-center items-center p-4">
      <FaChartLine size={40} color="var(--mantine-color-blue-filled)" />

      <Text c="dimmed">Future Earnings</Text>

      <Text
        className="text-2xl"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 179 }}
      >
        <NumberFormatter prefix="$" value={futureEarnings} thousandSeparator />
      </Text>
    </Paper>
  );
};

export default FutureEarnings;
