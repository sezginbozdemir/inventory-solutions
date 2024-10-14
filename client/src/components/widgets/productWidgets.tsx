import React from "react";
import { Paper, Text, Group, NumberFormatter } from "@mantine/core";
import { FaBox, FaMoneyCheckAlt, FaBoxes } from "react-icons/fa";
import { useAppSelector } from "../../store/store";

const ProductWidgets: React.FC = ({}) => {
  const products = useAppSelector((state) => state.products.products);
  const totalValue = products.reduce(
    (sum, product) => sum + (product.salePrice ?? 0) * (product.inStock ?? 0),
    0
  );
  const totalQuantity = products.reduce(
    (sum, product) => sum + (product.inStock ?? 0),
    0
  );

  return (
    <Group className="mt-3" grow preventGrowOverflow={true}>
      <Paper className="flex flex-col rounded h-44 ml-5 place-content-center items-center space-y-3">
        <FaBox className="text-2xl" color="var(--mantine-color-blue-filled)" />
        <Text c="dimmed">Total Products</Text>
        <Text
          className="text-2xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 179 }}
        >
          {products.length}
        </Text>
      </Paper>
      <Paper className="flex flex-col rounded h-44 place-content-center items-center space-y-3">
        <FaMoneyCheckAlt
          className="text-2xl"
          color="var(--mantine-color-blue-filled)"
        />
        <Text c="dimmed">Sale Budget</Text>
        <Text
          className="text-2xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 179 }}
        >
          <NumberFormatter prefix="$" value={totalValue} thousandSeparator />
        </Text>
      </Paper>
      <Paper className="flex flex-col rounded h-44 mr-5 place-content-center items-center space-y-3">
        <FaBoxes
          className="text-2xl"
          color="var(--mantine-color-blue-filled)"
        />
        <Text c="dimmed">Products in stock</Text>
        <Text
          className="text-2xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 179 }}
        >
          {totalQuantity}
        </Text>
      </Paper>
    </Group>
  );
};

export default ProductWidgets;
