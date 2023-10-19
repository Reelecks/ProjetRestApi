import express from "express";
import connection from "../db.js";

const livreRouteur = express.Router();

/**
 * Route pour récupérer tous les livres
 */
livreRouteur.get("/", (req, res) =>{
  const requete = "SELECT * FROM Livres";
  connection.query(requete, (err, results) => {
      if(err) throw err;
      res.json(results)
  });
});

/**
 * Route pour récupérer les livres disponibles
 */
livreRouteur.get("/disponibles", (req, res) =>{
  const requete = "SELECT * FROM Livres WHERE QuantiteDisponible > 0";
  connection.query(requete, (err, results) => {
      if(err) throw err;
      res.json(results)
  });
});

/**
 * Route pour récupérer un livre by ISBN
 */
livreRouteur.get("/:ISBN", (req, res) => {
  const livreISBN = req.params.ISBN;
  const requete = "SELECT * FROM Livres WHERE ISBN = ?";
  
  connection.query(requete, [livreISBN], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erreur lors de la récupération du livre par ISBN" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Aucun livre trouvé avec cet ISBN" });
    } else {
      res.json(results[0]);
    }
  });
});

/**
 * Route pour créer un livre
 */
livreRouteur.post("/", (req, res) => {
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
livreRouteur.put("/:id", (req, res) => {
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
        console.error("Erreur lors de la mise à jour du livre", err);
      } else {
        res.json({ message: "Mise à jour effectuée avec succès" });
      }
    }
  );
});

/**
 * Route pour supprimer un livre
 */
livreRouteur.delete("delete-livre/:ISBN", (req, res) => {
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
livreRouteur.get("/emprunts", (req, res) => {
  const requete = " SELECT Utilisateurs.Nom FROM Utilisateurs JOIN Emprunts ON(Emprunts.UtilisateurID = Utilisateurs.ID);"
  connection.query(requete, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

/**
 * Affichez la liste des livres disponibles dans une catégorie spécifique (celle que vous voulez= Roman).
 */
livreRouteur.get("/disponibles/:nomCategorie", (req, res) => {
  const livreCat = req.params.nomCategorie;
  const requete = " SELECT Livres.Titre FROM Livres JOIN Categories ON(Livres.CategorieID = Categories.ID) WHERE Livres.ISBN NOT IN(SELECT Livres.ISBN FROM Livres JOIN Emprunts ON(Emprunts.LivreISBN = Livres.ISBN )) AND NomCategorie = ?"
  connection.query(requete, [livreCat], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

/**
 * Procédure stockée 
 */
livreRouteur.get("/emprunts/retards", (req, res) => {
  const requete = "call RendusEnRetards()"
  connection.query(requete, (err, results) => {
    if (err) throw err;
    res.json(results);
});
});
  
  export default livreRouteur;