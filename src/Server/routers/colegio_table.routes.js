import { Router } from "express";
import {
  getColegio,
  getColegios,
  createColegio,
  updateColegio,
  deleteColegio,
} from "../controllers/colegio_table.js";


const router = Router();
router.get("/colegio", getColegios);

router.get("/colegio/:id", getColegio);

router.post("/colegio", createColegio);

router.put("/colegio/:id", updateColegio);

router.delete("/colegio/:id", deleteColegio);

export default router;
