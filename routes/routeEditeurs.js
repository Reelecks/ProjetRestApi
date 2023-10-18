import express from "express";
import connection from "../db.js";

const editeurRouteur = express.Router();

/**
 * Affiche tous les éditeurs
 */
editeurRouteur.get("/", (req, res) => {
    const requete = "SELECT * FROM Editeurs";
    connection.query(requete, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * Récupère les informations d'un éditeur
 */
editeurRouteur.get("/:id", (req, res) => {
    const idEditeur = req.params.id;
    const requete = "SELECT * FROM Editeurs WHERE id = ?";
    connection.query(requete, [idEditeur], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Editeur non trouvé" });
        }
    });
});

/**
 * Route pour créer un éditeur
 */
editeurRouteur.post("/", (req, res) => {
    const { nom } = req.body;
    const requete = "INSERT INTO Editeurs (nom) VALUES (?)";
    connection.query(requete, [nom], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la création de l\'éditeur');
            return;
        }
        res.status(201).send({ ...req.body, id: results.insertId });
    });
});

/**
 * Route pour modifier un éditeur
 */
editeurRouteur.put("/:id", (req, res) => {
    const idEditeur = req.params.id;
    const newEditor = req.body;
    const requete = "UPDATE Editeurs SET ? WHERE id = ?";
    connection.query(requete, [newEditor, idEditeur], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la mise à jour de l\'éditeur');
            return;
        }
        res.status(200).send('Editeur mis à jour avec succès');
    });
});

/**
 * Route pour supprimer un éditeur
 */
editeurRouteur.delete("/:id", (req, res) => {
    const idEditeur = req.params.id;
    const requete = "DELETE FROM Editeurs WHERE id = ?";
    connection.query(requete, [idEditeur], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 1) {
            res.json({ message: "Editeur supprimé", id: idEditeur });
        } else {
            res.status(404).json({ error: "Editeur non trouvé" });
        }
    });
});

export default editeurRouteur;
