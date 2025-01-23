import { Router } from "express";
import {
  getEvento,
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../controllers/evento_table.js";


const router = Router();
router.get("/evento", getEventos);

router.get("/evento/:id", getEvento);

router.post("/evento", createEvento);

router.put("/evento/:id", updateEvento);

router.delete("/evento/:id", deleteEvento);

export default router;
