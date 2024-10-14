import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./features/ProductSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CustomerSlice } from "./features/CustomerSlice";
import { OrderSlice } from "./features/OrderSlice";
import { EmployeeSlice } from "./features/EmployeeSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice.reducer,
    customers: CustomerSlice.reducer,
    orders: OrderSlice.reducer,
    employees: EmployeeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
