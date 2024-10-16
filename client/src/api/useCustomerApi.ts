import axios from "axios";

export interface Customer {
  name: string;
  company: string;
  adress: string;
  phone: string;
  _id: string;
  createdAt: Date;
}

const useCustomerApi = () => {
  const createCustomer = async (
    customer: Customer
  ): Promise<Customer | null> => {
    try {
      const response = await axios.post<Customer>(
        `${import.meta.env.VITE_API_ROUTE}/customers`,
        customer
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating customer: " + error.message);
      return null;
    }
  };

  const getCustomers = async (): Promise<Customer[]> => {
    try {
      const response = await axios.get<Customer[]>(
        `${import.meta.env.VITE_API_ROUTE}/customers`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching customers: " + error.message);
      return [];
    }
  };

  const updateCustomer = async (
    id: string,
    updatedCustomer: Customer
  ): Promise<Customer | null> => {
    try {
      const response = await axios.put<Customer>(
        `${import.meta.env.VITE_API_ROUTE}/customers/${id}`,
        updatedCustomer
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating customer: " + error.message);
      return null;
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      const response = await axios.delete<void>(
        `${import.meta.env.VITE_API_ROUTE}/customers/${id}`
      );
      return response.status === 204;
    } catch (error: any) {
      console.error("Error deleting customer: " + error.message);
      return null;
    }
  };

  return { createCustomer, getCustomers, updateCustomer, deleteCustomer };
};

export default useCustomerApi;
