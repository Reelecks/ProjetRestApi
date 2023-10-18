import express from "express";
import connection from "../db.js";

const auteurRouteur = express.Router();

/**
 * Affiche tous les auteurs
 */
auteurRouteur.get("/", (req, res) => {
    const requete = "SELECT * FROM Auteurs";
    connection.query(requete, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * Récupère les informations d'un auteur
 */
auteurRouteur.get("/:id", (req, res) => {
    const idAuteur = req.params.id;
    const requete = "SELECT * FROM Auteurs WHERE id = ?";
    connection.query(requete, [idAuteur], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Auteur non trouvé" });
        }
    });
});

/**
 * Route pour créer un auteur
 */
auteurRouteur.post("/", (req, res) => {
    const { nom, prenom, dateNaissance } = req.body; // Hypothèse de colonnes
    const requete = "INSERT INTO Auteurs (nom, prenom, dateNaissance) VALUES (?, ?, ?)";
    connection.query(requete, [nom, prenom, dateNaissance], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la création de l\'auteur');
            return;
        }
        res.status(201).send({ ...req.body, id: results.insertId });
    });
});

/**
 * Route pour modifier un auteur
 */
auteurRouteur.put("/:id", (req, res) => {
    const idAuteur = req.params.id;
    const newAuteur = req.body;
    const requete = "UPDATE Auteurs SET ? WHERE id = ?";
    connection.query(requete, [newAuteur, idAuteur], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la mise à jour de l\'auteur');
            return;
        }
        res.status(200).send('Auteur mis à jour avec succès');
    });
});

/**
 * Route pour supprimer un auteur
 */
auteurRouteur.delete("/:id", (req, res) => {
    const idAuteur = req.params.id;
    const requete = "DELETE FROM Auteurs WHERE id = ?";
    connection.query(requete, [idAuteur], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 1) {
            res.json({ message: "Auteur supprimé", id: idAuteur });
        } else {
            res.status(404).json({ error: "Auteur non trouvé" });
        }
    });
});

export default auteurRouteur;
