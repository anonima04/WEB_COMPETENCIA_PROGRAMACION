import { Router } from "express";
import {
  getEquipo,
  getEquipos,
  createEquipo,
  updateEquipo,
  deleteEquipo,
} from "../controllers/equipo.js";


const router = Router();
router.get("/equipo", getEquipos);

router.get("/equipo/:id", getEquipo);

router.post("/equipo", createEquipo);

router.put("/equipo/:id", updateEquipo);

router.delete("/equipo/:id", deleteEquipo);

export default router;
