import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Employee } from "../api/useEmployeeApi";
import { fetchEmployees, editEmployee } from "../store/features/EmployeeSlice";

export const useTaskForm = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const availableEmployees = useAppSelector(
    (state) => state.employees.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [taskList, setTaskList] = useState<
    {
      description: string;
      dueDate: Date;
      status: string;
      createdAt: Date;
    }[]
  >([]);

  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDueDate, setTaskDueDate] = useState<Date | null>(null);

  const [employee, setEmployee] = useState<Employee | undefined>({
    tasks: [],
    name: "",
    phone: "",
    active: "",
    role: "",
    password: "",
    email: "",
    _id: "",
  });

  const [errors, setErrors] = useState({
    employees: false,
    description: false,
    dueDate: false,
  });

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerOpen((prev) => !prev);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTaskDescription(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: !value,
    }));
  };

  const handleDueDate = (value: Date | null) => {
    const dateValue = value ? new Date(value) : null;
    setTaskDueDate(dateValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      dueDate: !value,
    }));
  };

  const handleTableDelete = (taskToDelete: { description: string }) => {
    setTaskList((prevList) =>
      prevList.filter((item) => item.description !== taskToDelete.description)
    );
  };

  const handleEmployeeChange = (value: string | null) => {
    const selectedEmployee = availableEmployees.find(
      (employee) => employee._id === value
    );

    setEmployee(selectedEmployee);

    setErrors((prevErrors) => ({
      ...prevErrors,
      employees: !selectedEmployee,
    }));
  };

  const handleAddTask = () => {
    const hasDescriptionError = !taskDescription;
    const hasDueDateError = !taskDueDate;

    setErrors((prevErrors) => ({
      ...prevErrors,
      description: hasDescriptionError,
      dueDate: hasDueDateError,
    }));

    if (hasDescriptionError || hasDueDateError) {
      return;
    }
    setTaskList((prevList) => [
      ...prevList,
      {
        description: taskDescription,
        dueDate: taskDueDate,
        status: "pending",
        createdAt: new Date(),
      },
    ]);
    setTaskDueDate(null);
    setTaskDescription("");
    setDatePickerOpen(false);
  };

  const handleSubmit = async () => {
    const newErrors = {
      employees: employee ? !employee._id : false,
      description: taskList.length === 0,
      dueDate: taskList.length === 0,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    let employeeToSubmit: Employee;

    if (employee?._id) {
      employeeToSubmit = {
        ...employee,
        tasks: [
          ...employee.tasks,
          ...taskList.map((task) => ({
            ...task,
            dueDate: task.dueDate.toLocaleDateString(),
          })),
        ],
      };
    } else {
      return;
    }

    await dispatch(
      editEmployee({ id: employeeToSubmit._id!, employee: employeeToSubmit })
    );
    dispatch(fetchEmployees());
    notifications.show({
      title: "Task Assigned.",
      message: "Tasks has been submitted successfully!",
      color: "green",
      autoClose: 3000,
    });
    onClose();
    resetForm();
    setTaskList([]);
  };

  const resetForm = () => {
    setEmployee({
      tasks: [],
      name: "",
      phone: "",
      email: "",
      _id: "",
    });
  };

  return {
    employee,
    errors,
    availableEmployees,
    handleEmployeeChange,
    handleSubmit,
    taskList,
    handleTableDelete,
    handleAddTask,
    handleDueDate,
    handleDescription,
    taskDescription,
    taskDueDate,
    isDatePickerOpen,
    toggleDatePicker,
  };
};
