import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  removeProduct,
  selectFilteredProducts,
  setFilter,
} from "../store/features/ProductSlice";
import { notifications } from "@mantine/notifications";

const useProductTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectFilteredProducts);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilter(searchValue));
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredProducts.length === 0
      ? setErrorMessage("No products found.")
      : setErrorMessage("");
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((productId) => {
      dispatch(removeProduct(productId));
    });
    notifications.show({
      title: "Product Deleted",
      message: "Selected products have been deleted successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    setSelectedRows([]);
  };

  return {
    selectedRows,
    setSelectedRows,
    searchValue,
    setSearchValue,
    errorMessage,
    handleSearch,
    handleDeleteSelected,
  };
};

export default useProductTable;
