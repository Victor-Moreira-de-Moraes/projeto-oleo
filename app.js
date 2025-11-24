// app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 2) rota raiz -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3) rota /pontos lendo do JSON
app.get("/pontos", async (req, res) => {
  try {
    const jsonPath = path.join(__dirname, "data", "pontos.json");
    const raw = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Erro ao ler pontos.json:", err);
    res.status(500).json({ error: "Falha ao carregar pontos de coleta" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on: ${PORT}`));
