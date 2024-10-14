import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { chunk } from "lodash";
import { FaPlus, FaTrash, FaRegEdit } from "react-icons/fa";
import { HiMiniArchiveBox } from "react-icons/hi2";
import {
  Input,
  Button,
  Table,
  Checkbox,
  Box,
  NumberFormatter,
  Pagination,
  Loader,
  Paper,
} from "@mantine/core";
import AddProductModal from "./../modals/addProductModal";
import EditProductModal from "./../modals/editProductModal";
import { useDisclosure } from "@mantine/hooks";
import useProductTable from "../../hooks/useProductTable";
import {
  fetchProducts,
  selectFilteredProducts,
} from "../../store/features/ProductSlice";

const ProductTable: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [activePage, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.products.loading);
  const products = useAppSelector(selectFilteredProducts);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const productPages = chunk(products, productsPerPage);
  const currentProducts = productPages[activePage - 1] || [];

  const {
    selectedRows,
    setSelectedRows,
    searchValue,
    setSearchValue,
    errorMessage,
    handleSearch,
    handleDeleteSelected,
  } = useProductTable();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCloseEditModal = () => {
    closeEditModal();
    setSelectedRows([]);
    dispatch(fetchProducts());
  };

  const rows = currentProducts.map((product) => (
    <Table.Tr
      key={product._id}
      bg={
        selectedRows.includes(product._id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(product._id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, product._id]
                : selectedRows.filter((position) => position !== product._id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <HiMiniArchiveBox size={20} />
      </Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={product.entryPrice}
          thousandSeparator
        />
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          prefix="$"
          value={product.salePrice}
          thousandSeparator
        />
      </Table.Td>
      <Table.Td>{product.inStock}</Table.Td>
    </Table.Tr>
  ));
  const isAllSelected =
    currentProducts.length > 0 &&
    selectedRows.length === currentProducts.length;

  return (
    <>
      <Paper className="m-5 mb-3 rounded" p="xs">
        <Box className="flex justify-between mr-3 ml-3 mt-5">
          <form className="ml-2 w-1/4" onSubmit={handleSearch}>
            <Input.Wrapper
              description="Search for products."
              error={errorMessage}
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                placeholder="Product name"
              />
            </Input.Wrapper>
            <Button type="submit" className="hidden"></Button>
          </form>
          <Box className="flex">
            {selectedRows.length > 0 && (
              <Box className="mr-3">
                {selectedRows.length === 1 && (
                  <Button
                    className="mr-3"
                    color="cyan"
                    mt="md"
                    onClick={openEditModal}
                  >
                    <FaRegEdit />
                  </Button>
                )}

                <Button
                  color="red"
                  leftSection={<FaTrash />}
                  mt="md"
                  onClick={handleDeleteSelected}
                >
                  ({selectedRows.length})
                </Button>
              </Box>
            )}
            <EditProductModal
              product={products.find((p) => p._id === selectedRows[0]) || null}
              opened={editModalOpened}
              onClose={handleCloseEditModal}
            />
            <Button
              leftSection={<FaPlus />}
              className="mr-5"
              justify="center"
              variant="default"
              mt="md"
              onClick={openAddModal}
            >
              Create product
            </Button>
          </Box>
        </Box>
        <AddProductModal opened={addModalOpened} onClose={closeAddModal} />
        <Box className="mt-3 border-t border-black-500">
          <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th c="dimmed">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={isAllSelected}
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        setSelectedRows(
                          currentProducts.map((product) => product._id)
                        );
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </Table.Th>

                <Table.Th />
                <Table.Th c="dimmed">Product Name</Table.Th>
                <Table.Th c="dimmed">Entry Price</Table.Th>
                <Table.Th c="dimmed">Sale Price</Table.Th>
                <Table.Th c="dimmed">In Stock</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="h-72">
              {loading ? (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                    <Loader size="lg" variant="dots" />
                  </Table.Td>
                </Table.Tr>
              ) : (
                rows
              )}
            </Table.Tbody>
            <Table.Caption>End of the list</Table.Caption>
          </Table>
          <Pagination
            className="flex place-content-center mt-3"
            total={totalPages}
            value={activePage}
            onChange={setPage}
            color="cyan"
          />
        </Box>
      </Paper>
    </>
  );
};

export default ProductTable;
