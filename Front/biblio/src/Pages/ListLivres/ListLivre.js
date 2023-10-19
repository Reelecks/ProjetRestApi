import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListLivre.css';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erreur de chargement des catégories', error);
      });
  }, []);

  useEffect(() => {
    let url = 'http://localhost:4000/livres/disponibles';
    if (selectedCategory) {
      url = `http://localhost:4000/livres/disponibles/${selectedCategory}`;
    }
  
    axios.get(url)
      .then(response => {
        setLivres(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur de chargement des livres', error);
        setIsLoading(false);
      });
  }, [selectedCategory]);

  const handleDelete = (ISBN) => {
    setIsDeleting(true);
    axios.delete(`http://localhost:4000/livres/delete/${ISBN}`)
      .then(response => {
      setIsDeleting(false);
      })
      .catch(error => {
      console.error('Erreur de suppression', error);
      setIsDeleting(false);
      });
  };

  return (
    <div className='container-list-livres'>
      <div className='header-list-livres'>
        <h1 className='title-page'>Liste des livres</h1>
        <div>
          <Link to="/add-livre">
            <button className='btn-add-livre'>Ajouter un livre</button>
          </Link>
        </div>

        <div>
          <label>Sélectionner une catégorie :</label>
          <select id="categorySelect" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Sélectionner une catégorie</option>
            {categories.map(categorie => (
              <option key={categorie.ID} value={categorie.NomCategorie}>{categorie.NomCategorie}</option>
            ))}
          </select>
        </div>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <ul>
            {livres.map(livre => (
              <li className='li-list-livres' key={livre.ISBN}>
                <h2 className='text-start'>{livre.Titre}</h2>

                <div className='btn-livres-list'>
                    <button className='btn-delete-livre' onClick={() => handleDelete(livre.ISBN)} disabled={isDeleting}>
                      {isDeleting ? 'Suppression...' : 'Suppression'}
                    </button>

                    <Link to={`/livres/${livre.ISBN}`}>
                      <button className='btn-edit-livre'>En savoir plus</button>
                    </Link>
                </div>
              </li>
            ))}
          </ul>

        </div>
      )}
      </div>
    </div>
  );
};

export default ListLivre;
