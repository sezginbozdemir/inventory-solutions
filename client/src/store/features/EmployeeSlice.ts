import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useEmployeeApi, { Employee } from "../../api/useEmployeeApi";

const { signUp, deleteEmployee, updateEmployee, getEmployees } =
  useEmployeeApi();

interface EmployeeState {
  loading: boolean;
  error: any;
  employees: Employee[];
  filter: string;
}

const initialState: EmployeeState = {
  loading: false,
  error: null,
  employees: [],
  filter: "",
};

export const fetchEmployees = createAsyncThunk("employee/fetch", async () => {
  const employees = await getEmployees();
  return employees;
});
export const sign = createAsyncThunk(
  "employee/signup",
  async (employee: Employee) => {
    const response = await signUp(employee);
    return response;
  }
);

export const removeEmployee = createAsyncThunk(
  "employee/delete",
  async (id: string) => {
    await deleteEmployee(id);
    return id;
  }
);

export const editEmployee = createAsyncThunk(
  "employee/edit",
  async ({ id, employee }: { id: string; employee: Employee }) => {
    const response = await updateEmployee(id, employee);
    return { id, employee: response };
  }
);

export const selectFilteredEmployees = (state: {
  employees: EmployeeState;
}) => {
  const { employees, filter } = state.employees;
  if (!filter) return employees;
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(filter.toLowerCase())
  );

  return filteredEmployees.length === 0 ? employees : filteredEmployees;
};
export const EmployeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.employees = [];
    });
    builder.addCase(sign.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sign.fulfilled, (state, action) => {
      if (action.payload) {
        state.employees.push(action.payload);
        state.loading = false;
      } else {
        state.error = "Failed to add employee";
      }
    });
    builder.addCase(sign.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.employees = [];
    });
    builder.addCase(removeEmployee.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.employees = [];
    });
    builder.addCase(editEmployee.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editEmployee.fulfilled, (state, action) => {
      const { id, employee } = action.payload;
      const index = state.employees.findIndex((p) => p._id === id);
      index !== -1 && employee
        ? (state.employees[index] = employee)
        : (state.error = "Failed to update employee.");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(editEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setFilter } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
