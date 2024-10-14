/// <reference types="vite/client" />
declare module "eslint-plugin-react-hooks";
declare module "eslint-plugin-react-refresh";

declare module "*.png" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_PRODUCTS_ROUTE: string;
  readonly VITE_CUSTOMERS_ROUTE: string;
  readonly VITE_ORDERS_ROUTE: string;
  readonly VITE_EMPLOYEE_ROUTE: string;
  // Add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
