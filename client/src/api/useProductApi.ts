import axios from "axios";

export interface Product {
  name: string;
  entryPrice: number | undefined;
  salePrice: number | undefined;
  inStock: number | undefined;
  _id: string;
}

const useProductApi = () => {
  //Create product hook
  const createProduct = async (product: Product): Promise<Product | null> => {
    try {
      const response = await axios.post<Product>(
        import.meta.env.VITE_PRODUCTS_ROUTE!,
        product
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating product: " + error.message);
      return null;
    }
  };

  // Get products hook

  const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(
        import.meta.env.VITE_PRODUCTS_ROUTE!
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching products: " + error.message);
      return [];
    }
  };

  // Update Product hook

  const updateProduct = async (
    id: string,
    updatedProduct: Product
  ): Promise<Product | null> => {
    try {
      const response = await axios.put<Product>(
        `${import.meta.env.VITE_PRODUCTS_ROUTE!}/${id}`,
        updatedProduct
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating product: " + error.message);
      return null;
    }
  };

  // Delete product hook

  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete<void>(
        `${import.meta.env.VITE_PRODUCTS_ROUTE!}/${id}`
      );
      return response.status === 204;
    } catch (error: any) {
      console.error("Error deleting product: " + error.message);
      return null;
    }
  };

  return { createProduct, getProducts, updateProduct, deleteProduct };
};

export default useProductApi;
