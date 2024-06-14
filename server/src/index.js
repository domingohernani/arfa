import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "arfa",
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM model";

  db.query(query, (err, data) => {
    if (err) return res.json(err).sendStatus(500);
    return res.json(data);
  });
});

app.listen(8800, () => console.log("Server is running"));
