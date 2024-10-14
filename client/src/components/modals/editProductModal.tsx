import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Text } from "@mantine/core";
import { useAppDispatch } from "../../store/store";
import { editProduct } from "../../store/features/ProductSlice";
import { Product } from "../../api/useProductApi";
import { notifications } from "@mantine/notifications";

interface EditProductModalProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null; // Product to be edited
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  opened,
  onClose,
  product,
}) => {
  const dispatch = useAppDispatch();

  const [updatedProduct, setUpdatedProduct] = useState<Product>({
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

  // Populate the modal with the existing product details
  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: !e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !updatedProduct.name,
      entryPrice: !updatedProduct.entryPrice,
      salePrice: !updatedProduct.salePrice,
      inStock: !updatedProduct.inStock,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    await dispatch(
      editProduct({ id: updatedProduct._id, product: updatedProduct })
    );
    notifications.show({
      title: "Product edited",
      message: "Product has been edited successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });

    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} centered title="Edit Product">
      <Input.Wrapper
        label="Product Name"
        error={errors.name && <Text size="xs">Product name is required</Text>}
      >
        <Input
          placeholder="Product name"
          name="name"
          value={updatedProduct.name}
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
          value={updatedProduct.entryPrice}
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
          value={updatedProduct.salePrice}
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
          value={updatedProduct.inStock}
          onChange={handleInputChange}
        />
      </Input.Wrapper>

      <Button fullWidth mt="md" onClick={handleSubmit}>
        Update Product
      </Button>
    </Modal>
  );
};

export default EditProductModal;
