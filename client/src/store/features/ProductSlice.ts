import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useProductApi, { Product } from "../../api/useProductApi";

const { getProducts, createProduct, deleteProduct, updateProduct } =
  useProductApi();

interface ProductState {
  loading: boolean;
  error: any;
  products: Product[];
  filter: string;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  products: [],
  filter: "",
};

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const products = await getProducts();
  return products;
});
export const addProduct = createAsyncThunk(
  "product/add",
  async (product: Product) => {
    const response = await createProduct(product);
    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    await deleteProduct(id);
    return id;
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({ id, product }: { id: string; product: Product }) => {
    const response = await updateProduct(id, product);
    return { id, product: response };
  }
);

export const selectFilteredProducts = (state: { products: ProductState }) => {
  const { products, filter } = state.products;
  if (!filter) return products;
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return filteredProducts.length === 0 ? products : filteredProducts;
};
export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.products = [];
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.products.push(action.payload);
        state.loading = false;
      } else {
        state.error = "Failed to add product";
      }
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.products = [];
    });
    builder.addCase(removeProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.products = [];
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      const { id, product } = action.payload;
      const index = state.products.findIndex((p) => p._id === id);
      index !== -1 && product
        ? (state.products[index] = product)
        : (state.error = "Failed to update product.");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setFilter } = ProductSlice.actions;

export default ProductSlice.reducer;
