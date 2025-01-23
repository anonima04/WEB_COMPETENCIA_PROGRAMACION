import { Router } from "express";
import {
  getNivelEvento,
  getNivelesEvento,
  createNivelEvento,
  updateNivelEvento,
  deleteNivelEvento,
} from "../controllers/nivel_evento_table.js";


const router = Router();
router.get("/nivel-evento", getNivelesEvento);

router.get("/nivel-evento/:id", getNivelEvento);

router.post("/nivel-evento", createNivelEvento);

router.put("/nivel-evento/:id", updateNivelEvento);

router.delete("/nivel-evento/:id", deleteNivelEvento);

export default router;
