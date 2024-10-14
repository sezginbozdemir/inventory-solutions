import React, { useState } from "react";
import { Input, Button, Modal, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/store";
import { addProduct } from "../../store/features/ProductSlice";
import { Product } from "../../api/useProductApi";
import { notifications } from "@mantine/notifications";

interface AddProductModalProps {
  opened: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  opened,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    entryPrice: undefined,
    salePrice: undefined,
    inStock: undefined,
    _id: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    entryPrice: false,
    salePrice: false,
    inStock: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: !e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !newProduct.name,
      entryPrice: !newProduct.entryPrice,
      salePrice: !newProduct.salePrice,
      inStock: !newProduct.inStock,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    await dispatch(addProduct(newProduct));
    notifications.show({
      title: "Product created",
      message: "Product has been added successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    onClose();
    setNewProduct({
      name: "",
      entryPrice: undefined,
      salePrice: undefined,
      inStock: undefined,
      _id: "",
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} centered title="Add New Product">
      <Input.Wrapper
        label="Product Name"
        error={errors.name && <Text size="xs">Product name is required</Text>}
      >
        <Input
          placeholder="Product name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Entry Price"
        error={
          errors.entryPrice && <Text size="xs">Entry price is required</Text>
        }
      >
        <Input
          placeholder="Entry price"
          type="number"
          name="entryPrice"
          value={newProduct.entryPrice}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="Sale Price"
        error={
          errors.salePrice && <Text size="xs">Sale price is required</Text>
        }
      >
        <Input
          placeholder="Sale price"
          type="number"
          name="salePrice"
          value={newProduct.salePrice}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label="In Stock"
        error={errors.inStock && <Text size="xs">In stock is required</Text>}
      >
        <Input
          placeholder="In stock"
          type="number"
          name="inStock"
          value={newProduct.inStock}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Button fullWidth mt="md" onClick={handleSubmit}>
        Save Product
      </Button>
    </Modal>
  );
};

export default AddProductModal;
