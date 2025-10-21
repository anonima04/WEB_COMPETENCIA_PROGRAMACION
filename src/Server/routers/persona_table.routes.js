import { Router } from "express";
import {
  getPerson,
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../controllers/persona_table.controllers.js";


const router = Router();
router.get("/persona", getPeople);

router.get("/persona/:id", getPerson);

router.post("/persona", createPerson);

router.put("/persona/:id", updatePerson);

router.delete("/persona/:id", deletePerson);

export default router;
