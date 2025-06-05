import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  login
} from "../controllers/usuario_table.controllers.js";


const router = Router();
router.get("/usuario", getUsuarios);

router.get("/usuario/:id", getUsuario);

router.post("/usuario", createUsuario);

router.post("/login", login);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);

export default router;
