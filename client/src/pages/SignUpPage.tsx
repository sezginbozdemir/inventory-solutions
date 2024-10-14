import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Box,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useEmployeeApi, { Employee } from "../api/useEmployeeApi";

const SignupPage = () => {
  const { signUp } = useEmployeeApi();
  const [formData, setFormData] = useState<Employee>({
    name: "",
    email: "",
    password: "",
    phone: "",
    _id: "",
    tasks: [],
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const employeeData: Employee = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      name: formData.name,
      _id: "",
      tasks: [],
    };

    const response = await signUp(employeeData);
    if (response) {
      notifications.show({
        title: "Success",
        message: "Signup successful! An admin will get you access soon..",
        color: "green",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      notifications.show({
        title: "Error",
        message: "Signup failed. ",
        color: "red",
        autoClose: 3000,
      });
    }
  };

  return (
    <Paper className="h-screen w-screen">
      <Box className="flex h-full items-center justify-center">
        <form className="w-80" onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            c="dimmed"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            mt="md"
          />
          <TextInput
            label="Phone"
            c="dimmed"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            mt="md"
          />
          <TextInput
            leftSection={
              <MdAlternateEmail size={20} className="pr-1 border-r-2" />
            }
            label="Email"
            c="dimmed"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            mt="md"
          />
          <PasswordInput
            leftSection={
              <RiLockPasswordLine size={20} className="pr-1 border-r-2" />
            }
            label="Password"
            c="dimmed"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            mt="md"
          />

          <Box className="flex items-center justify-between">
            <Anchor c="cyan" href="#login">
              Login{" "}
            </Anchor>
            <Button type="submit" color="cyan" mt="md">
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default SignupPage;
