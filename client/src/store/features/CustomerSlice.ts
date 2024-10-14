import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useCustomerApi, { Customer } from "../../api/useCustomerApi";

const { getCustomers, createCustomer, deleteCustomer, updateCustomer } =
  useCustomerApi();

interface CustomerState {
  loading: boolean;
  error: any;
  customers: Customer[];
  filter: string;
}

const initialState: CustomerState = {
  loading: false,
  error: null,
  customers: [],
  filter: "",
};

export const fetchCustomers = createAsyncThunk("customer/fetch", async () => {
  const customers = await getCustomers();
  return customers;
});
export const addCustomer = createAsyncThunk(
  "customer/add",
  async (customer: Customer) => {
    const response = await createCustomer(customer);
    return response;
  }
);

export const removeCustomer = createAsyncThunk(
  "customer/delete",
  async (id: string) => {
    await deleteCustomer(id);
    return id;
  }
);

export const editCustomer = createAsyncThunk(
  "customer/edit",
  async ({ id, customer }: { id: string; customer: Customer }) => {
    const response = await updateCustomer(id, customer);
    return { id, customer: response };
  }
);

export const selectFilteredCustomers = (state: {
  customers: CustomerState;
}) => {
  const { customers, filter } = state.customers;
  if (!filter) return customers;
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return filteredCustomers.length === 0 ? customers : filteredCustomers;
};
export const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.customers = [];
    });
    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      if (action.payload) {
        state.customers.push(action.payload);
        state.loading = false;
      } else {
        state.error = "Failed to add product";
      }
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.customers = [];
    });
    builder.addCase(removeCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.customers = [];
    });
    builder.addCase(editCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editCustomer.fulfilled, (state, action) => {
      const { id, customer } = action.payload;
      const index = state.customers.findIndex((p) => p._id === id);
      index !== -1 && customer
        ? (state.customers[index] = customer)
        : (state.error = "Failed to update customer.");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(editCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setFilter } = CustomerSlice.actions;

export default CustomerSlice.reducer;
