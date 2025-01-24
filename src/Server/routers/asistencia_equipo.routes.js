import { Router } from "express";
import {
  getAsistenciaEquipos,
  getAsistenciaEquipo,
  createAsistenciaEquipo,
  updateAsistenciaEquipo,
  deleteAsistenciaEquipo,
} from "../controllers/asistencia_equipo.js";


const router = Router();
router.get("/asistencia_equipo", getAsistenciaEquipos);

router.get("/asistencia_equipo/:id", getAsistenciaEquipo);

router.post("/asistencia_equipo", createAsistenciaEquipo);

router.put("/asistencia_equipo/:id", updateAsistenciaEquipo);

router.delete("/asistencia_equipo/:id", deleteAsistenciaEquipo);

export default router;
