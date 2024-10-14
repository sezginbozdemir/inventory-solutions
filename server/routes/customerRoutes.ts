import { Router } from "express";

import CustomerController from "../controllers/customerControllers";

const router = Router();

router.get("/customers", CustomerController.getAllCustomers);

router.post("/customers", CustomerController.createCustomer);

router.delete("/customers/:id", CustomerController.deleteCustomer);

router.put("/customers/:id", CustomerController.updateCustomer);

export default router;
