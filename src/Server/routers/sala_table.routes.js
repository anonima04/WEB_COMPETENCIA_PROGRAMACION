import { Router } from "express";
import {
  getSalas,
  getSala,
  createSala,
  updateSala,
  deleteSala,
} from "../controllers/sala_table.js";


const router = Router();
router.get("/sala", getSalas);

router.get("/sala/:id", getSala);

router.post("/sala", createSala);

router.put("/sala/:id", updateSala);

router.delete("/sala/:id", deleteSala);

export default router;
