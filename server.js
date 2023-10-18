import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'biblio'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données');
});

app.get("/", (req, res) => {
  res.send("server ready");
});

/**
 * Route pour récupérer tous les livres
 */
app.get("/livres", (req, res) =>{
  const requete = "SELECT * FROM Livres";
  connection.query(requete, (err, results) => {
      if(err) throw err;
      res.json(results)
  });
});


/**
 * Route pour créer un livre
 */


/**
 * Route pour modifier un livre
 */


/**
 * Route pour supprimer un livre
 */



/**
 * Affichez la liste des utilisateurs ayant emprunté un livre
 */

/**
 * Affichez la liste des livres disponibles dans une catégorie spécifique (celle que vous voulez= Fantasy).
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
