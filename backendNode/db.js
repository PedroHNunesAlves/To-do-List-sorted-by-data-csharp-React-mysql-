// Adicionando o banco de dados MySQL
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new_password",
  database: "dtidatabase",
});
