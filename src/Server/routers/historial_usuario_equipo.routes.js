import { Router } from "express";
import {
  getHistorialUsuarioEquipos,
  getHistorialUsuarioEquipo,
  createHistorialUsuarioEquipo,
  updateHistorialUsuarioEquipo,
  deleteHistorialUsuarioEquipo,
} from "../controllers/historial_usuario_equipo.js";


const router = Router();
router.get("/historial_usuario_equipo", getHistorialUsuarioEquipos);

router.get("/historial_usuario_equipo/:id", getHistorialUsuarioEquipo);

router.post("/historial_usuario_equipo", createHistorialUsuarioEquipo);

router.put("/historial_usuario_equipo/:id", updateHistorialUsuarioEquipo);

router.delete("/historial_usuario_equipo/:id", deleteHistorialUsuarioEquipo);

export default router;
