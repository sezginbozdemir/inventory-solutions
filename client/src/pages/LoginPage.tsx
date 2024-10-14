import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Box,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useEmployeeApi from "../api/useEmployeeApi";

const LoginPage = () => {
  const { login } = useEmployeeApi();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { token, active, name, role } = await login(
      formData.email,
      formData.password
    );

    if (active == "pending" || active === "inactive") {
      notifications.show({
        title: "Error",
        message: "Your account is not active. Please contact support.",
        color: "red",
        autoClose: 3000,
      });
      return;
    }
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
        autoClose: 3000,
      });
      navigate("/dashboard");
    } else {
      notifications.show({
        title: "Error",
        message: "Login failed. Please check your credentials.",
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
            <Anchor c="cyan" href="#signup">
              Register now
            </Anchor>
            <Button type="submit" color="cyan" mt="md">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default LoginPage;
