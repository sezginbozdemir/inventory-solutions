import "./App.css";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import { Navigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import AdminRoute from "./components/AdminRoute";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Notifications />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element={<AdminRoute redirectTo="/" />}>
                <Route path="/employees" element={<EmployeesPage />} />
              </Route>

              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
