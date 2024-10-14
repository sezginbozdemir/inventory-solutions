import { Request, Response } from "express";
import Order from "../models/orderModel";
import { orderIdGen } from "../models/orderModel";
import Product from "../models/productModel";

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const orderId = await orderIdGen();
      const newOrder = new Order({
        orderId: orderId,
        customerId: req.body.customerId,
        products: req.body.products,
        orderDate: req.body.orderDate,
      });
      const createdOrder = await newOrder.save();

      for (const product of req.body.products) {
        await Product.updateOne(
          { _id: product.productId },
          { $inc: { inStock: -product.quantity } }
        );
      }
      res.status(200).json(createdOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted succesfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const id = req.body._id;
      const body = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(id, body);
      res.status(200).json(updatedOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orderData = await Order.find()
        .populate("customerId")
        .populate("products.productId");
      res.status(200).json(orderData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default OrderController;
