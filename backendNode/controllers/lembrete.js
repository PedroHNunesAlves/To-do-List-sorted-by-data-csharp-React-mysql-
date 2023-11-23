import { db } from "../db.js";

export const puxarLembrete = (_, res) => {
  const queryQ = "SELECT *, DATE_FORMAT(data, '%d/%m/%Y') AS dataFormatada FROM lembretesdti";

  db.query(queryQ, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const criarLembrete = (req, res) => {
  const queryQ = "INSERT INTO lembretesdti(id, lembrete, data) VALUES(?)";

  const values = [req.body.id, req.body.lembrete, req.body.data];

  db.query(queryQ, [values], (err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json("Lembrete criado :) ");
    }
  });
};

export const updateUser = (req, res) => {
  const queryQ = "UPDATE lembretesdti SET `lembrete` = ?,  `data` = ? WHERE `id` = ?";

  const values = [req.body.id, req.body.lembrete, req.body.data];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json("Lembrete Atualizado!");
    }
  });
};

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
