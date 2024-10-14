import React from "react";
import {
  NumberFormatter,
  NumberInput,
  Input,
  Button,
  Modal,
  Box,
  Select,
  Table,
  ActionIcon,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FaPlus, FaRegWindowClose } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

import { useOrderForm } from "../../hooks/useOrderForm";
import { BsCalendarDate } from "react-icons/bs";

interface AddOrderModalProps {
  opened: boolean;
  onClose: () => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ opened, onClose }) => {
  const {
    newOrder,
    errors,
    availableCustomers,
    availableProducts,
    handleCustomerChange,
    handleProductChange,
    handleQuantityChange,
    handleSubmit,
    handleAddProduct,
    selectedProductId,
    selectedQuantity,
    productList,
    handleTableDelete,
    handleTableQuantity,
    toggleDatePicker,
    isDatePickerOpen,
    orderDate,
    handleOrderDate,
  } = useOrderForm(onClose);

  return (
    <Modal
      fullScreen
      opened={opened}
      onClose={onClose}
      centered
      title="Create New Order"
    >
      <Box className="flex flex-col min-h-96 p-5 border-slate-300 border rounded">
        <Box>
          <Group className="flex items-stretch">
            <Select
              className="w-1/2 self-start"
              placeholder="Customers.."
              label="Select Customer"
              name="customerId"
              value={newOrder.customerId._id}
              onChange={handleCustomerChange}
              error={errors.customerId && "Customer is required"}
              data={availableCustomers.map((customer) => ({
                value: customer._id,
                label: `${customer.name}   -   ${customer.adress}   -   ${customer.phone}`,
              }))}
              checkIconPosition="right"
              searchable
              nothingFoundMessage="Nothing found..."
            />
            <Group className="flex-col h-full">
              <Button
                className="mt-6 self-start"
                variant="default"
                leftSection={<BsCalendarDate />}
                onClick={toggleDatePicker}
              >
                {orderDate ? orderDate.toLocaleDateString() : "Select a date"}
              </Button>
              {isDatePickerOpen && (
                <DatePicker
                  className="self-start mb-3"
                  value={orderDate}
                  onChange={handleOrderDate}
                ></DatePicker>
              )}
            </Group>
          </Group>

          <Box className="flex">
            <Select
              placeholder="Products.."
              className="w-1/2"
              label="Select Product"
              name="productId"
              value={selectedProductId ? selectedProductId._id : null}
              onChange={handleProductChange}
              error={errors.products && "Product is required"}
              data={availableProducts.map((product) => ({
                value: product._id,
                label: `${product.name}   -   ${product.salePrice} $`,
              }))}
              checkIconPosition="right"
              searchable
              nothingFoundMessage="Nothing found..."
            />
            <Input.Wrapper
              className="ml-3"
              error={errors.quantity && "Quantity is required"}
              label="Quantity"
            >
              <NumberInput
                className="max-w-20"
                value={selectedQuantity}
                onChange={(value) => {
                  const quantity =
                    typeof value === "number" && value > 0 ? value : undefined;
                  handleQuantityChange(quantity);
                }}
                min={1}
              />
            </Input.Wrapper>
            <Button
              leftSection={<FaPlus />}
              variant="default"
              className="mt-6 ml-3"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Box>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>ID</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Sale Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {productList.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <TiShoppingCart size={20} />
                  </Table.Td>
                  <Table.Td>{item.productId._id}</Table.Td>
                  <Table.Td>{item.productId.name}</Table.Td>
                  <Table.Td>
                    <NumberFormatter
                      prefix="$"
                      value={item.productId.salePrice}
                      thousandSeparator
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      className="max-w-20"
                      value={item.quantity}
                      onChange={(value) => {
                        const quantity =
                          typeof value === "number" && value > 0
                            ? value
                            : undefined;
                        handleTableQuantity(quantity, item.productId._id);
                      }}
                      min={1}
                    />
                  </Table.Td>

                  <Table.Td>
                    <NumberFormatter
                      prefix="$"
                      value={item.productId.salePrice! * item.quantity!}
                      thousandSeparator
                    />
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon
                      variant="default"
                      onClick={() => handleTableDelete(item.productId._id)}
                    >
                      <FaRegWindowClose />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Td colSpan={5} className="text-right font-bold">
                  Total:
                </Table.Td>
                <Table.Td>
                  <NumberFormatter
                    prefix="$"
                    value={productList.reduce((acc, item) => {
                      const itemTotal =
                        item.productId.salePrice! * item.quantity!;
                      return acc + itemTotal;
                    }, 0)}
                    thousandSeparator
                  />
                </Table.Td>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Box>
        <Button
          variant="default"
          className="mt-96"
          fullWidth
          onClick={handleSubmit}
        >
          Save Order
        </Button>
      </Box>
    </Modal>
  );
};

export default AddOrderModal;
