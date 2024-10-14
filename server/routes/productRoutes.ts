import { Router } from "express";

import ProductController from "../controllers/productControllers";

const router = Router();

router.get("/products", ProductController.getAllProducts);

router.post("/products", ProductController.createProduct);

router.delete("/products/:id", ProductController.deleteProduct);

router.put("/products/:id", ProductController.updateProduct);

export default router;
