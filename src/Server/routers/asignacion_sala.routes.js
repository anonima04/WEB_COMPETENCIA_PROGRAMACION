import { Router } from "express";
import {
  getAsignacionesSalas,
  getAsignacionSala,
  createAsignacionSala,
  updateAsignacionSala,
  deleteAsignacionSala,
} from "../controllers/asignacion_sala_table.js";


const router = Router();
router.get("/asignacion_sala", getAsignacionesSalas);

router.get("/asignacion_sala/:id", getAsignacionSala);

router.post("/asignacion_sala", createAsignacionSala);

router.put("/asignacion_sala/:id", updateAsignacionSala);

router.delete("/asignacion_sala/:id", deleteAsignacionSala);

export default router;
