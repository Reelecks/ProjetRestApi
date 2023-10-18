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
app.delete("/livres/:ISBN", (req, res) => {
  const livreISBN = req.params.ISBN;
  const requete = "DELETE FROM Livres WHERE ISBN = ?"
  connection.query(requete, [livreISBN], (err, result) => {
    if(err) throw err;
    if (result.affectedRows === 1) {
      res.json({ message: "Livre supprimé", id: livreISBN });
    } else {
      res.status(404).json({ error: "Livre non trouvé" });
    }
  });
});


/**
 * Affichez la liste des utilisateurs ayant emprunté un livre
 */
app.get("/emprunts", (req, res) => {
  const requete = " SELECT Utilisateurs.Nom FROM Utilisateurs JOIN Emprunts ON(Emprunts.UtilisateurID = Utilisateurs.ID);"
  ;
  connection.query(requete, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

/**
 * Affichez la liste des livres disponibles dans une catégorie spécifique (celle que vous voulez= Fantasy).
 */


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
