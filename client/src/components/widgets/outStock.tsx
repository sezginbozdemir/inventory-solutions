import React from "react";
import { Table, ScrollArea, Paper, Text } from "@mantine/core";
import { useAppSelector } from "../../store/store";

const OutStock: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);

  const outStockProducts = products.filter((product) => product.inStock! === 0);

  return (
    <Paper className="w-full mt-3 flex-col rounded place-content-center items-center p-4">
      <Text c="dimmed" mb="md">
        Out of Stock Products
      </Text>
      <ScrollArea className="h-72">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product Name</Table.Th>
              <Table.Th>Stock Remaining</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {outStockProducts.length > 0 ? (
              outStockProducts.map((product) => (
                <Table.Tr key={product._id}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.inStock}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={2}>No products are out of stock.</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};

export default OutStock;
