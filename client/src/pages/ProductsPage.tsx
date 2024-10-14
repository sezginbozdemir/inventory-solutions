import React from "react";
import ProductTable from "../components/tables/ProductTable";
import ProductWidgets from "../components/widgets/productWidgets";
import { Breadcrumbs, Anchor } from "@mantine/core";

const ProductsPage: React.FC = () => {
  return (
    <>
      <Breadcrumbs className="p-5">
        <Anchor href="#dashboard">Dashboard</Anchor>
        <Anchor href="#products">Products</Anchor>
      </Breadcrumbs>
      <ProductWidgets />
      <ProductTable />
    </>
  );
};

export default ProductsPage;
