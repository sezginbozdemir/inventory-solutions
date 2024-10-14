import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

import { useAppDispatch, useAppSelector } from "../store/store";
import { addOrder, fetchOrders } from "../store/features/OrderSlice";
import { fetchProducts } from "../store/features/ProductSlice";
import { fetchCustomers } from "../store/features/CustomerSlice";
import { Order } from "../api/useOrderApi";
import { Product } from "../api/useProductApi";

export const useOrderForm = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const availableCustomers = useAppSelector(
    (state) => state.customers.customers
  );
  const availableProducts = useAppSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const [productList, setProductList] = useState<
    { productId: Product; quantity: number | undefined }[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState<Product | null>(
    null
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>(
    undefined
  );
  const [orderDate, setOrderDate] = useState<Date | null>(null);

  const [newOrder, setNewOrder] = useState<Order>({
    customerId: {
      name: "",
      company: "",
      adress: "",
      phone: "",
      _id: "",
      createdAt: new Date(),
    },
    products: [
      {
        productId: {
          name: "",
          entryPrice: undefined,
          salePrice: undefined,
          inStock: undefined,
          _id: "",
        },
        quantity: undefined,
      },
    ],
    orderId: "",
    orderDate: new Date().toLocaleDateString(),
    status: "",
    _id: "",
  });

  const [errors, setErrors] = useState({
    customerId: false,
    products: false,
    quantity: false,
  });

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerOpen((prev) => !prev);
  };
  const handleOrderDate = (value: Date | null) => {
    setOrderDate(value);
    setNewOrder((prevState) => ({
      ...prevState,
      orderDate: value!.toLocaleDateString(),
    }));
  };

  const handleTableQuantity = (
    value: number | undefined,
    productId: string
  ) => {
    setProductList((prevList) =>
      prevList.map((item) =>
        item.productId._id === productId ? { ...item, quantity: value } : item
      )
    );
  };
  const handleTableDelete = (productId: string) => {
    setProductList((prevList) =>
      prevList.filter((item) => item.productId._id !== productId)
    );
  };

  const handleCustomerChange = (value: string | null) => {
    const selectedCustomer = availableCustomers.find(
      (customer) => customer._id === value
    );

    setNewOrder((prevState) => ({
      ...prevState,
      customerId: selectedCustomer || {
        name: "",
        company: "",
        adress: "",
        phone: "",
        _id: "",
        createdAt: new Date(),
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      customerId: !selectedCustomer,
    }));
  };

  const handleProductChange = (value: string | null) => {
    const selectedProduct = availableProducts.find(
      (product) => product._id === value
    );
    setSelectedProductId(selectedProduct || null);
  };

  const handleQuantityChange = (value: number | undefined) => {
    setSelectedQuantity(value);
  };

  const handleAddProduct = () => {
    const productExists = productList.find(
      (product) => product.productId === selectedProductId
    );

    const productError = !selectedProductId;
    const quantityError = !selectedQuantity || selectedQuantity < 1;
    setErrors((prevErrors) => ({
      ...prevErrors,
      products: productError,
      quantity: quantityError,
    }));

    if (productError || quantityError) {
      return;
    }

    if (!productExists) {
      setProductList((prevList) => [
        ...prevList,
        { productId: selectedProductId, quantity: selectedQuantity },
      ]);
      setSelectedProductId(null);
      setSelectedQuantity(1);
    } else {
      console.log("Product already exists in the list");
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      customerId: !newOrder.customerId._id,
      products: productList.length === 0,
      quantity: productList.length === 0,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const orderToSubmit = {
      ...newOrder,
      products: productList, // Use the updated product list
    };
    console.log(orderToSubmit);

    await dispatch(addOrder(orderToSubmit));
    dispatch(fetchOrders());
    notifications.show({
      title: "Order Submitted",
      message: "Your order has been submitted successfully!",
      color: "green",
      autoClose: 3000, // Close after 3 seconds
    });
    onClose();
    resetForm();
    setProductList([]);
    setOrderDate(null);
    setDatePickerOpen(false);
  };

  const resetForm = () => {
    setNewOrder({
      customerId: {
        name: "",
        company: "",
        adress: "",
        phone: "",
        _id: "",
        createdAt: new Date(),
      },
      products: [
        {
          productId: {
            name: "",
            entryPrice: undefined,
            salePrice: undefined,
            inStock: undefined,
            _id: "",
          },
          quantity: undefined,
        },
      ],
      orderId: "",
      orderDate: new Date().toLocaleDateString(),
      status: "",
      _id: "",
    });
  };

  return {
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
    isDatePickerOpen,
    toggleDatePicker,
    orderDate,
    handleOrderDate,
  };
};
