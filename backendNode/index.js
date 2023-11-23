import express from "express";
import cors from "cors";
import rotasLembretes from "./routes/lembretes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", rotasLembretes);

app.listen(8800);
