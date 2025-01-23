import { Router } from "express";
import {
  getEjerciciosResueltos,
  getEjercicioResuelto,
  createEjercicioResuelto,
  updateEjercicioResuelto,
  deleteEjercicioResuelto,
} from "../controllers/ejercicios_resueltos_table.js";


const router = Router();
router.get("/ejercicios_resueltos", getEjerciciosResueltos);

router.get("/ejercicios_resueltos/:id", getEjercicioResuelto);

router.post("/ejercicios_resueltos", createEjercicioResuelto);

router.put("/ejercicios_resueltos/:id", updateEjercicioResuelto);

router.delete("/ejercicios_resueltos/:id", deleteEjercicioResuelto);

export default router;
