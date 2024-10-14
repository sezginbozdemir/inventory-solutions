import { Request, Response } from "express";
import Product from "../models/productModel";

class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const { name, entryPrice, salePrice, inStock } = req.body;
      const newProduct = new Product({
        name,
        entryPrice,
        salePrice,
        inStock,
      });
      const createdProduct = await newProduct.save();
      res.status(200).json(createdProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted succesfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const id = req.body._id;
      const body = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(id, body);
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const productData = await Product.find();
      res.status(200).json(productData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductController;
