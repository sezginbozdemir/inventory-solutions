import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {
  Group,
  Burger,
  Image,
  Text,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  Avatar,
  Box,
} from "@mantine/core";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}
const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  return (
    <Group className="flex justify-between" h="100%" px="md">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Image h={55} src={logo} alt="Logo" />
        <Text className="hidden md:block">INVENTORY SOLUTIONS</Text>
      </Group>
      <Group gap="xl" className="mr-10">
        <Group>
          <Avatar radius="xl" color="cyan">
            {name!.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Text size="sm">{name?.toUpperCase()}</Text>
            <Text size="xs" c="dimmed">
              {role?.toUpperCase()}
            </Text>
          </Box>
        </Group>
        <ActionIcon variant="outline" color="grey" onClick={toggleColorScheme}>
          {colorScheme === "light" ? (
            <MdOutlineDarkMode size={25} />
          ) : (
            <CiLight size={25} />
          )}
        </ActionIcon>
        <ActionIcon variant="outline" color="grey" onClick={handleLogout}>
          <IoMdLogOut size={25} />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default Header;
