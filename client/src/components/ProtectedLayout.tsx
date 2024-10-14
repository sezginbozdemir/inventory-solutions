import React from "react";
import { AppShell, useMantineColorScheme, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import SideBar from "./sideBar";
import Header from "./header";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
const ProtectedLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery("(max-width: 46.25em)");
  const lightModeBg = "#f0f0f0";
  const darkModeBg = "#1a1a1a";
  const mainBgColor = colorScheme === "dark" ? darkModeBg : lightModeBg;
  return (
    <AppShell
      className="h-screen"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SideBar />
      </AppShell.Navbar>
      <AppShell.Main
        style={{ backgroundColor: mainBgColor, paddingBottom: "2rem" }}
      >
        {isMobile ? (
          <Title
            order={3}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            Please use a computer for the best experience.
          </Title>
        ) : (
          <Outlet />
        )}{" "}
      </AppShell.Main>
    </AppShell>
  );
};

export default ProtectedLayout;
