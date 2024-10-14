import React from "react";
import { Paper, Text, NumberFormatter } from "@mantine/core";
import { TfiMoney } from "react-icons/tfi";
import { useAppSelector } from "../../store/store";

const TotalBudget: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);
  const totalBudget = products.reduce((total, product) => {
    const salePrice = Number(product.salePrice);
    const inStock = Number(product.inStock);
    return total + salePrice * inStock;
  }, 0);
  return (
    <Paper className="h-48 w-1/6 flex flex-col rounded place-content-center items-center p-4">
      <TfiMoney size={40} color="var(--mantine-color-blue-filled)" />

      <Text c="dimmed">Total Budget</Text>

      <Text
        className="text-2xl"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 179 }}
      >
        <NumberFormatter prefix="$" value={totalBudget} thousandSeparator />
      </Text>
    </Paper>
  );
};

export default TotalBudget;
