import express from "express";
import { puxarLembrete, criarLembrete, deletarLembrete, editarLembrete } from "../controllers/lembrete.js";
const router = express.Router();

router.get("/", puxarLembrete);
router.post("/", criarLembrete);

// É selecionado por meio do id
router.delete("/:id", deletarLembrete);
router.put("/:id", editarLembrete);

export default router;
