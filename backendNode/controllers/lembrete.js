import { db } from "../db.js";

// GET dos lembretes, utilização de conversão de data, devido formato diferente no mysql
export const puxarLembrete = (_, res) => {
  const queryQ = "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') AS dataFormatada FROM lembretesdti";

  // retorna status erro, caso erro, ou status 200 (ok)
  db.query(queryQ, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// POST
export const criarLembrete = (req, res) => {
  const queryQ = "INSERT INTO lembretesdti(id, lembrete, data) VALUES(?)";

  // requisição dos campos
  const values = [req.body.id, req.body.lembrete, req.body.data];

  // retorna status erro, caso erro, ou status 200 (ok). Recebe como parâmetros a query, campos de endereçamento
  db.query(queryQ, [values], (err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json("Lembrete criado :) ");
    }
  });
};

// PUT

export const editarLembrete = (req, res) => {
  const queryQ = "UPDATE lembretesdti SET `lembrete` = ?, `data` = ? WHERE `id` = ?";

  const values = [req.body.lembrete, req.body.data];

  db.query(queryQ, [...values, req.params.id], (err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json("Lembrete Atualizado!!!!!!!!!!!!  ");
    }
  });
};

// DELETE
export const deletarLembrete = (req, res) => {
  const queryQ = "DELETE FROM lembretesdti WHERE `id` = ?";

  db.query(queryQ, [req.params.id], (err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json("Lembrete deletado :( ");
    }
  });
};
