import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmprunterLivre.css';

function EmprunterLivre({ ISBN, onClose }) {
    const [formData, setFormData] = useState({
      UtilisateurID: '',
      LivreISBN: ISBN,
      DateEmprunt: ''
    });
  

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/utilisateurs')  // Remplacez par la route appropriée
      .then(response => setUtilisateurs(response.data))
      .catch(error => console.error("Erreur lors de la récupération des utilisateurs:", error));

    axios.get('http://localhost:4000/livres/disponibles') // Remplacez par la route appropriée
      .then(response => setLivres(response.data))
      .catch(error => console.error("Erreur lors de la récupération des livres:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axios.put(`http://localhost:4000/livres/emprunter/${formData.LivreISBN}`, formData)
      .then(response => {
        console.log("Livre emprunté avec succès:", response.data);
        onClose();
      })
      .catch(error => {
        console.error("Erreur lors de l'emprunt du livre:", error);
      });
  };

  return (
    <div className="emprunterLivre-overlay">
      <div className="emprunterLivre-popup">
        <h2>Emprunter un livre</h2>
        <button className="close-button" onClick={onClose}>&times;</button>

        <form onSubmit={handleSubmit}>
          <select name="UtilisateurID" value={formData.UtilisateurID} onChange={handleChange} required>
            <option value="">Sélectionner un utilisateur</option>
            {utilisateurs.map(utilisateur => (
              <option key={utilisateur.ID} value={utilisateur.ID}>{utilisateur.Nom + ' ' + utilisateur.Prenom}</option>
            ))}
          </select>

          <input type="date" name="DateEmprunt" value={formData.DateEmprunt} onChange={handleChange} required />

          <button type="submit">Emprunter</button>
        </form>
      </div>
    </div>
  );
}

export default EmprunterLivre;
