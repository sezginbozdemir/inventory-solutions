import axios from "axios";
import { Customer } from "./useCustomerApi";
import { Product } from "./useProductApi";

export interface Order {
  customerId: Customer;
  products: {
    productId: Product;
    quantity: number | undefined;
  }[];
  orderId: string;
  orderDate: string;
  status: string;
  _id: string;
}

const useOrderApi = () => {
  const createOrder = async (order: Order): Promise<Order | null> => {
    try {
      const response = await axios.post<Order>(
        "http://localhost:8000/api/orders",
        order
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating order: " + error.message);
      return null;
    }
  };

  const getOrders = async (): Promise<Order[]> => {
    try {
      const response = await axios.get<Order[]>(
        import.meta.env.VITE_ORDERS_ROUTE!
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching orders: " + error.message);
      return [];
    }
  };

  const updateOrder = async (
    id: string,
    updatedOrder: Order
  ): Promise<Order | null> => {
    try {
      const response = await axios.put<Order>(
        `${import.meta.env.VITE_ORDERS_ROUTE!}/${id}`,
        updatedOrder
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating order: " + error.message);
      return null;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await axios.delete<void>(
        `${import.meta.env.VITE_ORDERS_ROUTE!}/${id}`
      );
      return response.status === 200;
    } catch (error: any) {
      console.error("Error deleting order: " + error.message);
      return null;
    }
  };

  return { createOrder, getOrders, updateOrder, deleteOrder };
};

export default useOrderApi;
