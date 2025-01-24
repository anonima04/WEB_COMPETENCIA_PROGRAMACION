import { Router } from "express";
import {
  getTipoDocumentos,
  getTipoDocumento,
  createTipoDocumento,
  updateTipoDocumento,
  deleteTipoDocumento,
} from "../controllers/tipo_documento_table.js";


const router = Router();
router.get("/tipo_documento", getTipoDocumentos);

router.get("/tipo_documento/:id", getTipoDocumento);

router.post("/tipo_documento", createTipoDocumento);

router.put("/tipo_documento/:id", updateTipoDocumento);

router.delete("/tipo_documento/:id", deleteTipoDocumento);

export default router;
