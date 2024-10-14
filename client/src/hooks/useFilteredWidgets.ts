import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../store/store";

const useFilteredOrders = () => {
  const orders = useAppSelector((state) => state.orders.orders);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (orders.length > 0) {
      const years = Array.from(
        new Set(orders.map((order) => order.orderDate.split("/")[2]))
      );
      setAvailableYears(years);

      if (!selectedYear && years.length > 0) {
        setSelectedYear(years[0]);
      }

      if (selectedYear) {
        setSelectedMonth(null);
      }
    }
  }, [orders, selectedYear]);

  const filteredOrders = useMemo(() => {
    if (!selectedYear) return orders;

    const filteredByYear = orders.filter(
      (order) => order.orderDate.split("/")[2] === selectedYear
    );

    if (!selectedMonth) return filteredByYear;
    return filteredByYear.filter(
      (order) =>
        new Date(
          `${order.orderDate.split("/")[2]}-${order.orderDate.split("/")[1]}`
        ).toLocaleString("default", { month: "long" }) === selectedMonth
    );
  }, [orders, selectedYear, selectedMonth]);

  return {
    availableYears,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    filteredOrders,
    allMonths,
    orders,
  };
};

export default useFilteredOrders;
