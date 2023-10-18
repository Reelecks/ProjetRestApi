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
app.post("/livres", (req, res) => {
    const {ISBN, Titre, AuteurID, AnneePublication, QuantiteDisponible, CategorieID, EditeurId} = req.body;
    const sql = "INSERT INTO livres (ISBN, Titre, AuteurID, AnneePublication, QuantiteDisponible, CategorieID, EditeurId) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [ISBN, Titre, AuteurID, AnneePublication, QuantiteDisponible, CategorieID, EditeurId], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du livre');
            return;
        }
        res.status(201).send({ ...req.body });
    });
});

/**
 * Route pour modifier un livre
 */
app.put("/livres/:id", (req, res) => {
  const isbnLivre = req.params.id;
  const { Titre, AuteurID, AnneePublication, QuantiteDisponible, CategorieID, EditeurID } = req.body;

  const updatedBookData = `
    UPDATE Livres
    SET Titre = ?,
        AuteurID = ?,
        AnneePublication = ?,
        QuantiteDisponible = ?,
        CategorieID = ?,
        EditeurID = ?
    WHERE ISBN = ?;`;

  connection.query(
    updatedBookData,
    [Titre, AuteurID, AnneePublication, QuantiteDisponible, CategorieID, EditeurID, isbnLivre],
    (err, results) => {
      if (err) {
        console.error("Error updating book", err);
      } else {
        res.json({ message: "Book updated successfully" });
      }
    }
  );
});

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
 * Affichez la liste des livres disponibles dans une catégorie spécifique (celle que vous voulez= Roman).
 */
app.get("/livres/disponibles/:nomCategorie", (req, res) => {
  const livreCat = req.params.nomCategorie;
  const requete = " SELECT Livres.Titre FROM Livres JOIN Categories ON(Livres.CategorieID = Categories.ID) WHERE Livres.ISBN NOT IN(SELECT Livres.ISBN FROM Livres JOIN Emprunts ON(Emprunts.LivreISBN = Livres.ISBN )) AND NomCategorie = ?;"
  ;
  connection.query(requete, [livreCat], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

/**
 * Procédure stockée 
 */
app.get("/emprunts/retards", (req, res) => {
  const requete = "call RendusEnRetards();"
  ;
  connection.query(requete, (err, results) => {
    if (err) throw err;
    res.json(results);
});
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
