import React, { useState, useEffect } from 'react';
import AddLivre from '../../components/PopUp/AddLivre';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListLivre.css';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddLivre, setShowAddLivre] = useState(false);

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

  const loadLivres = () => {
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
  };
  

  const handleDelete = (ISBN) => {
    axios.delete(`http://localhost:4000/livres/delete/${ISBN}`)
      .then(response => {
        loadLivres();
      })
      .catch(error => {
        console.error('Erreur de suppression', error);
      });
  };

  const refreshLivresList = () => {
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
}

  return (
    <div className='container-list-livres'>
      <div className='header-list-livres'>
        <h1 className='title-page'>Liste des livres</h1>
        <div>   
          <button className='btn-add-livre' onClick={() => setShowAddLivre(true)}>
            Ajouter un livre
          </button>
          {showAddLivre && <AddLivre onClose={() => setShowAddLivre(false)} onLivreAdded={refreshLivresList} />}

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
                    <button className='btn-delete-livre' onClick={() => handleDelete(livre.ISBN)} > Supprimer
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
