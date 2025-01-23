import { Router } from "express";
import {
  getInstitucion,
  getInstituciones,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion,
} from "../controllers/institucion_table.js";


const router = Router();
router.get("/institucion", getInstituciones);

router.get("/institucion/:id", getInstitucion);

router.post("/institucion", createInstitucion);

router.put("/institucion/:id", updateInstitucion);

router.delete("/institucion/:id", deleteInstitucion);

export default router;
