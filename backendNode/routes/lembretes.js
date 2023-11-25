import express from "express";
import { puxarLembrete, criarLembrete, deletarLembrete } from "../controllers/lembrete.js";
const router = express.Router();

router.get("/", puxarLembrete);
router.post("/", criarLembrete);

// É selecionado por meio do id
router.delete("/:id", deletarLembrete);
// Não exigido put/update

export default router;
