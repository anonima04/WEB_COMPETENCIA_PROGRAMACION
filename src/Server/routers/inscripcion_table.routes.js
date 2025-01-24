import { Router } from "express";
import {
  getInscripcion,
  getInscripciones,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
} from "../controllers/inscripcion_table.js";


const router = Router();
router.get("/inscripcion", getInscripciones);

router.get("/inscripcion/:id", getInscripcion);

router.post("/inscripcion", createInscripcion);

router.put("/inscripcion/:id", updateInscripcion);

router.delete("/inscripcion/:id", deleteInscripcion);

export default router;
