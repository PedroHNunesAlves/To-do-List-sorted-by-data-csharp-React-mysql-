// Utilização de express e cors
import express from "express";
import cors from "cors";
import rotasLembretes from "./routes/lembretes.js";

// Instanciando expresss e CORS
const app = express();
app.use(cors());

// Retornos em formato JSON
app.use(express.json());

// Utilização na raiz
app.use("/", rotasLembretes);

// Porta 8800
app.listen(8800);
