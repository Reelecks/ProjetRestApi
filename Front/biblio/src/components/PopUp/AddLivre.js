import React, { useState, useEffect } from 'react';
import './AddLivre.css';

const AddLivre = ({ onClose }) => {
  const [formData, setFormData] = useState({
    ISBN: '',
    Titre: '',
    AuteurID: '',
    AnneePublication: '',
    QuantiteDisponible: '',
    CategorieID: '',
    EditeurID: ''
  });
  const [auteurs, setAuteurs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editeurs, setEditeurs] = useState([]);

  useEffect(() => {
    const fetchAuteurs = async () => {
      const response = await fetch('http://localhost:4000/auteurs');
      const data = await response.json();
      setAuteurs(data);
    };

    const fetchCategories = async () => {
      const response = await fetch('http://localhost:4000/categories');
      const data = await response.json();
      setCategories(data);
    };

    const fetchEditeurs = async () => {
      const response = await fetch('http://localhost:4000/editeurs');
      const data = await response.json();
      setEditeurs(data);
    };

    fetchAuteurs();
    fetchCategories();
    fetchEditeurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/livres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        onClose();
      } else {
        console.error("Erreur lors de l'ajout du livre:", await response.text());
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi des données:", err);
    }
  };

  return (
    <div className="addLivre-overlay">
      <div className="addLivre-popup">
        <button onClick={onClose}>Fermer</button>
        <h2>Ajouter un livre</h2>

        <form onSubmit={handleSubmit}>
          <input name="ISBN" value={formData.ISBN} onChange={handleChange} placeholder="ISBN" required />
          <input name="Titre" value={formData.Titre} onChange={handleChange} placeholder="Titre" required />
          <select name="AuteurID" value={formData.AuteurID} onChange={handleChange} required>
            <option value="">Sélectionner un auteur</option>
            {auteurs.map(auteur => <option key={auteur.ID} value={auteur.ID}>{auteur.Nom +' '+ auteur.Prenom}</option>)}
          </select>
          <input name="AnneePublication" value={formData.AnneePublication} onChange={handleChange} placeholder="AnneePublication" required />
          <input name="QuantiteDisponible" value={formData.QuantiteDisponible} onChange={handleChange} placeholder="QuantiteDisponible" required />
          <select name="CategorieID" value={formData.CategorieID} onChange={handleChange} required>
            <option value="">Sélectionner une catégorie</option>
            {categories.map(categorie => <option key={categorie.ID} value={categorie.ID}>{categorie.NomCategorie}</option>)}
          </select>
          <select name="EditeurID" value={formData.EditeurID} onChange={handleChange} required>
            <option value="">Sélectionner un éditeur</option>
            {editeurs.map(editeur => <option key={editeur.ID} value={editeur.ID}>{editeur.NomEditeur}</option>)}
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
  };

  export default AddLivre;