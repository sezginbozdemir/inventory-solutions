import { Router } from "express";

import OrderController from "../controllers/orderControllers";

const router = Router();

router.get("/orders", OrderController.getAllOrders);

router.post("/orders", OrderController.createOrder);

router.delete("/orders/:id", OrderController.deleteOrder);

router.put("/orders/:id", OrderController.updateOrder);

export default router;
