import React from "react";
import { Paper, Text, Group } from "@mantine/core";
import { IoIosPeople } from "react-icons/io";
import { useAppSelector } from "../../store/store";
import ClientsChart from "./orderCount";
import RecentCustomers from "./recentCustomers";

const CustomerWidgets: React.FC = ({}) => {
  const customers = useAppSelector((state) => state.customers.customers);

  return (
    <Group className="mt-3" grow preventGrowOverflow={true}>
      <Paper className="flex flex-col rounded h-44 ml-5 place-content-center items-center space-y-3">
        <IoIosPeople size={40} color="var(--mantine-color-blue-filled)" />
        <Text c="dimmed">Total Customers</Text>
        <Text
          className="text-2xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 179 }}
        >
          {customers.length}
        </Text>
      </Paper>
      <Paper className="flex flex-col rounded h-44 p-3 space-y-3">
        <Text c="dimmed">Customers by Orders</Text>
        <ClientsChart />
      </Paper>
      <Paper className="flex flex-col rounded h-44 mr-5 space-y-3 p-3">
        <Text c="dimmed">Recently Added Customers</Text>
        <RecentCustomers />
      </Paper>
    </Group>
  );
};

export default CustomerWidgets;
