import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/persona_table.controllers.js";


const router = Router();
router.get("/persona", getProducts);

router.get("/persona/:id", getProduct);

router.post("/persona", createProduct);

router.put("/persona/:id", updateProduct);

router.delete("/persona/:id", deleteProduct);

export default router;
