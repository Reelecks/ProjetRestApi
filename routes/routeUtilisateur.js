import express from "express";
import connection from "../db.js";
const utilisateurRouteur= express.Router();



/**
 * Affiche tous les utilisateurs
 */
utilisateurRouteur.get("/", (req, res) => {
    const requete = "SELECT * FROM Utilisateurs";
    connection.query(requete, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/**
 * Récupère les informations d'un utilisateur
 */
utilisateurRouteur.get("/:id", (req, res) => {
    const idUtilisateur = req.params.id;
    const requete = "SELECT * FROM Utilisateurs WHERE id = ?";
    connection.query(requete, [idUtilisateur], (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    });
});


/**
 * Route pour créer un utilisateur
 */
utilisateurRouteur.post("/", (req, res) => {
    const { nom, prenom, email } = req.body;
    const requete = "INSERT INTO Utilisateurs (nom, prenom, email) VALUES (?, ?, ?)";
    connection.query(requete, [nom, prenom, email], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la création de l\'utilisateur');
            return;
        }
        res.status(201).send({ ...req.body, id: results.insertId });
    });
});

/**
 * Route pour modifier un utilisateur
 */
utilisateurRouteur.put("/:id", (req, res) => {
    const idUtilisateur = req.params.id;
    const newUser = req.body;
    const requete = "UPDATE Utilisateurs SET ? WHERE id = ?";
    connection.query(requete, [newUser, idUtilisateur], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
            return;
        }
        res.status(200).send('Utilisateur mis à jour avec succès');
    });
});

/**
 * Route pour supprimer un utilisateur
 */
utilisateurRouteur.delete("/:id", (req, res) => {
    const idUtilisateur = req.params.id;
    const requete = "DELETE FROM Utilisateurs WHERE id = ?";
    connection.query(requete, [idUtilisateur], (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 1) {
            res.json({ message: "Utilisateur supprimé", id: idUtilisateur });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    });
});
export default utilisateurRouteur;