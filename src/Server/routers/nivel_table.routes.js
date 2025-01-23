import { Router } from "express";
import {
  getNivel,
  getNiveles,
  createNivel,
  updateNivel,
  deleteNivel,
} from "../controllers/nivel_table.js";


const router = Router();
router.get("/nivel", getNiveles);

router.get("/nivel/:id", getNivel);

router.post("/nivel", createNivel);

router.put("/nivel/:id", updateNivel);

router.delete("/nivel/:id", deleteNivel);

export default router;
