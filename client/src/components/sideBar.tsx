import React, { useState } from "react";
import { NavLink } from "@mantine/core";
import { RxDashboard } from "react-icons/rx";
import { SlSocialDropbox } from "react-icons/sl";
import { BsPerson } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { GiCargoCrate } from "react-icons/gi";
import isUserAdmin from "../utils/adminUtil";

const SideBar: React.FC = () => {
  const [active, setActive] = useState("");

  const isAdmin = isUserAdmin();
  return (
    <>
      <NavLink
        style={{ textDecoration: "none", color: "inherit" }}
        className="p-7 font-bold"
        href="#dashboard"
        label="Dashboard"
        active={"Dash" === active}
        color="cyan"
        leftSection={<RxDashboard size="1.5rem" />}
        onClick={() => setActive("Dash")}
      />
      <NavLink
        style={{ textDecoration: "none", color: "inherit" }}
        color="cyan"
        className="p-7 font-bold"
        active={"Products" === active}
        onClick={() => setActive("Products")}
        href="#products"
        label="Products"
        leftSection={<GiCargoCrate size="1.5rem" />}
      />
      <NavLink
        style={{ textDecoration: "none", color: "inherit" }}
        color="cyan"
        className="p-7 font-bold"
        href="#customers"
        active={"Customers" === active}
        onClick={() => setActive("Customers")}
        label="Customers"
        leftSection={<BsPerson size="1.5rem" />}
      />

      <NavLink
        style={{ textDecoration: "none", color: "inherit" }}
        color="cyan"
        className="p-7 font-bold"
        href="#orders"
        active={"Orders" === active}
        onClick={() => setActive("Orders")}
        label="Orders"
        leftSection={<SlSocialDropbox size="1.5rem" />}
      />
      {isAdmin && (
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          color="cyan"
          className="p-7 font-bold"
          href="#employees"
          active={"Employees" === active}
          onClick={() => setActive("Employees")}
          label="Employees"
          leftSection={<GrUserWorker size="1.5rem" />}
        />
      )}
      <NavLink
        style={{ textDecoration: "none", color: "inherit" }}
        color="cyan"
        className="p-7 font-bold"
        href="#tasks"
        active={"My Tasks" === active}
        onClick={() => setActive("My Tasks")}
        label="My Tasks"
        leftSection={<MdAddTask size="1.5rem" />}
      />
    </>
  );
};

export default SideBar;
