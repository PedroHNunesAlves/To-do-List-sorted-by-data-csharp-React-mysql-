import express from "express";
import { puxarLembrete, criarLembrete, deletarLembrete } from "../controllers/lembrete.js";
const router = express.Router();

router.get("/", puxarLembrete);
router.post("/", criarLembrete);
router.delete("/:id", deletarLembrete);
// Não exigido post/update

export default router;
