import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useOrderApi, { Order } from "../../api/useOrderApi";

const { getOrders, createOrder, deleteOrder, updateOrder } = useOrderApi();

interface OrderState {
  loading: boolean;
  error: any;
  orders: Order[];
  filter: string;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  orders: [],
  filter: "",
};

export const fetchOrders = createAsyncThunk("order/fetch", async () => {
  const orders = await getOrders();
  return orders;
});
export const addOrder = createAsyncThunk("order/add", async (order: Order) => {
  const response = await createOrder(order);
  return response;
});

export const removeOrder = createAsyncThunk(
  "order/delete",
  async (id: string) => {
    await deleteOrder(id);
    return id;
  }
);

export const editOrder = createAsyncThunk(
  "order/edit",
  async ({ id, order }: { id: string; order: Order }) => {
    const response = await updateOrder(id, order);
    return { id, order: response };
  }
);

export const selectFilteredOrders = (state: { orders: OrderState }) => {
  const { orders, filter } = state.orders;
  if (!filter) return orders;
  const filteredOrders = orders.filter((orders) =>
    orders.orderId.toLowerCase().includes(filter.toLowerCase())
  );

  return filteredOrders.length === 0 ? orders : filteredOrders;
};
export const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.orders = [];
    });
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders.push(action.payload);
        state.loading = false;
      } else {
        state.error = "Failed to add order";
      }
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.orders = [];
    });
    builder.addCase(removeOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.orders = [];
    });
    builder.addCase(editOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editOrder.fulfilled, (state, action) => {
      const { id, order } = action.payload;
      const index = state.orders.findIndex((p) => p._id === id);
      index !== -1 && order
        ? (state.orders[index] = order)
        : (state.error = "Failed to update order.");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(editOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setFilter } = OrderSlice.actions;

export default OrderSlice.reducer;
