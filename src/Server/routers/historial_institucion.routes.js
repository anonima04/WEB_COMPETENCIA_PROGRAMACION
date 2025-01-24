import { Router } from "express";
import {
  getHistorial_institucion,
  getHistorial_instituciones,
  createHistorial_institucion,
  updateHistorial_institucion,
  deleteHistorial_institucion,
} from "../controllers/historial_institucion.js";


const router = Router();
router.get("/historial_institucion", getHistorial_instituciones);

router.get("/historial_institucion/:id", getHistorial_institucion);

router.post("/historial_institucion", createHistorial_institucion);

router.put("/historial_institucion/:id", updateHistorial_institucion);

router.delete("/historial_institucion/:id", deleteHistorial_institucion);

export default router;
