import React from "react";
import { Table, ScrollArea, Paper } from "@mantine/core";
import { useAppSelector } from "../../store/store";

const RecentCustomers: React.FC = () => {
  const customers = useAppSelector((state) => state.customers.customers);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentCustomers = [...customers]
    .filter((customer) => new Date(customer.createdAt) >= thirtyDaysAgo)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <>
      <ScrollArea>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer Name</Table.Th>

              <Table.Th>Date Added</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recentCustomers.length > 0 ? (
              recentCustomers.map((customer) => (
                <Table.Tr key={customer._id}>
                  <Table.Td>{customer.name}</Table.Td>

                  <Table.Td>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  No customers added in the last 30 days.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default RecentCustomers;
