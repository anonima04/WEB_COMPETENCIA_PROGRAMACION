import { Router } from "express";
import {
  getUniversidad,
  getUniversidades,
  createUniversidad,
  updateUniversidad,
  deleteUniversidad,
} from "../controllers/universidad_table.js";


const router = Router();
router.get("/universidad", getUniversidades);

router.get("/universidad/:id", getUniversidad);

router.post("/universidad", createUniversidad);

router.put("/universidad/:id", updateUniversidad);

router.delete("/universidad/:id", deleteUniversidad);

export default router;
