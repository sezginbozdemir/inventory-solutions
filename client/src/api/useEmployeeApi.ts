import axios from "axios";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  role?: string;
  active?: string;
  tasks: {
    description: string;
    dueDate: string;
    status: string;
    createdAt: Date;
  }[];
}

const useEmployeeApi = () => {
  const signUp = async (employee: Employee): Promise<Employee | null> => {
    try {
      const response = await axios.post<Employee>(
        `${import.meta.env.VITE_API_ROUTE}/employee/signup`,
        employee
      );
      return response.data;
    } catch (error: any) {
      console.error("Error signing up", error.message);
      return null;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{
    token: string | null;
    active: string;
    name: string;
    role: string;
  }> => {
    try {
      const response = await axios.post<{
        token: string;
        active: string;
        name: string;
        role: string;
      }>(`${import.meta.env.VITE_API_ROUTE}/employee/login`, {
        email,
        password,
      });
      return {
        token: response.data.token,
        active: response.data.active,
        name: response.data.name,
        role: response.data.role,
      };
    } catch (error: any) {
      console.error("Error loging in", error.message);
      return {
        token: null,
        name: "",
        active: error.response.data.active,
        role: "",
      };
    }
  };

  const getEmployees = async (): Promise<Employee[]> => {
    try {
      const response = await axios.get<Employee[]>(
        `${import.meta.env.VITE_API_ROUTE}/employee`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employees", error.message);
      return [];
    }
  };

  const updateEmployee = async (
    id: string,
    updatedEmployee: Employee
  ): Promise<Employee | null> => {
    try {
      const response = await axios.put<Employee>(
        `${import.meta.env.VITE_API_ROUTE}/employee/${id}`,
        updatedEmployee
      );
      return response.data;
    } catch (error: any) {
      console.error("Error updating employee", error.message);
      return null;
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const response = await axios.delete<void>(
        `${import.meta.env.VITE_API_ROUTE}/employee/${id}`
      );
      return response.status === 200;
    } catch (error: any) {
      console.error("Error deleting employee", error.message);
      return null;
    }
  };
  return { signUp, login, updateEmployee, deleteEmployee, getEmployees };
};

export default useEmployeeApi;
