import { Router } from "express";
import {
  getEjercicios,
  getEjercicio,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio,
} from "../controllers/ejercicios_table.js";


const router = Router();
router.get("/ejercicio", getEjercicios);

router.get("/ejercicio/:id", getEjercicio);

router.post("/ejercicio", createEjercicio);

router.put("/ejercicio/:id", updateEjercicio);

router.delete("/ejercicio/:id", deleteEjercicio);

export default router;
