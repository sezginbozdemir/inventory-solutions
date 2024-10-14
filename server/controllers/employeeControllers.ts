import Employee from "../models/employeeModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class EmployeeController {
  static async signUp(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: "Employee aldreay exists" });
      }

      const newEmployee = new Employee({
        name,
        email,
        password,
        phone,
      });

      await newEmployee.save();

      return res.status(201).json({ message: "Employeecreated succesfuly" });
    } catch (error: any) {
      console.error("error creating employee", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(400).json({ message: "Invalid email adress" });
      } else {
        if (employee.active !== "active") {
          return res.status(403).json({
            message: `Account is ${employee.active}. Please contact the administrator.`,
            active: employee.active,
          });
        }
        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
          {
            id: employee._id,
            email: employee.email,
            active: employee.active,
            role: employee.role,
          },
          process.env.JWT_KEY!,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: "Login succesful",
          token,
          active: employee.active,
          name: employee.name,
          role: employee.role,
        });
      }
    } catch (error: any) {
      console.error("error logging employee");
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteEmployee(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Employee.findByIdAndDelete(id);
      return res.status(200).json({ message: "Employee deleted succesfully" });
    } catch (error: any) {
      console.error("Error deleting employee", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateEmployee(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedEmployee = await Employee.findByIdAndUpdate(id, body);
      res.status(200).json(updatedEmployee);
    } catch (error: any) {
      console.error("Error updating employee", error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async getAllEmployees(req: Request, res: Response) {
    try {
      const employeeData = await Employee.find();
      res.status(200).json(employeeData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default EmployeeController;
