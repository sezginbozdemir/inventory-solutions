import { Request, Response } from "express";
import Customer from "../models/customerModel";

class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    try {
      const { name, company, adress, phone } = req.body;

      const newCustomer = new Customer({
        name,
        company,
        adress,
        phone,
      });
      const createdCustomer = await newCustomer.save();
      res.status(200).json(createdCustomer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCustomer(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Customer.findByIdAndDelete(id);
      res.status(200).json({ message: "Customer deleted succesfuly" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCustomer(req: Request, res: Response) {
    try {
      const id = req.body._id;
      const body = req.body;
      const updatedCustomer = await Customer.findByIdAndUpdate(id, body);
      res.status(200).json(updatedCustomer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllCustomers(req: Request, res: Response) {
    try {
      const customerData = await Customer.find();
      res.status(200).json(customerData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CustomerController;
