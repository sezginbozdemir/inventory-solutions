import { Router } from "express";

import EmployeeController from "../controllers/employeeControllers";

const router = Router();

router.post("/employee/signup", EmployeeController.signUp);

router.post("/employee/login", EmployeeController.login);

router.delete("/employee/:id", EmployeeController.deleteEmployee);

router.put("/employee/:id", EmployeeController.updateEmployee);

router.get("/employee", EmployeeController.getAllEmployees);

export default router;
