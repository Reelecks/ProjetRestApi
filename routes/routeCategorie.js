import express from "express";
import connection from "../db.js";

const categorieRouteur = express.Router();

/**
 * Affiche toutes les catégories
 */
categorieRouteur.get("/", (req, res) => {
    const requete = "SELECT * FROM Categories";
    connection.query(requete, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * Récupère les informations d'une catégorie
 */
categorieRouteur.get("/:id", (req, res) => {
    const idCategorie = req.params.id;
    const requete = "SELECT * FROM Categories WHERE id = ?";
    connection.query(requete, [idCategorie], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Catégorie non trouvée" });
        }
    });
});

/**
 * Route pour créer une catégorie
 */
categorieRouteur.post("/", (req, res) => {
    const { nom } = req.body;
    const requete = "INSERT INTO Categories (NomCategorie) VALUES (?)";
    connection.query(requete, [nom], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la création de la catégorie');
            return;
        }
        res.status(201).send({ ...req.body, id: results.insertId });
    });
});

/**
 * Route pour modifier une catégorie
 */
categorieRouteur.put("/:id", (req, res) => {
    const idCategorie = req.params.id;
    const newCategory = req.body;
    const requete = "UPDATE Categories SET ? WHERE id = ?";
    connection.query(requete, [newCategory, idCategorie], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la mise à jour de la catégorie');
            return;
        }
        res.status(200).send('Catégorie mise à jour avec succès');
    });
});

/**
 * Route pour supprimer une catégorie
 */
categorieRouteur.delete("/:id", (req, res) => {
    const idCategorie = req.params.id;
    const requete = "DELETE FROM Categories WHERE id = ?";
    connection.query(requete, [idCategorie], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 1) {
            res.json({ message: "Catégorie supprimée", id: idCategorie });
        } else {
            res.status(404).json({ error: "Catégorie non trouvée" });
        }
    });
});

export default categorieRouteur;
