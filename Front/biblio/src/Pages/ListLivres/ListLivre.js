import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListLivre.css';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/livres/disponibles')
      .then(response => {
        setLivres(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur de chargement des livres', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='container-list-livres'>
      <div className='header-list-livres'>
        <h1 className='title-page'>Liste des livres</h1>
        <div>
          <Link to="/add-">
            <button className='btn-add-livre'>Ajouter un livre</button>
          </Link>
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
                    <Link to={`/delete-livre/${livre.ISBN}`}>
                      <button className='btn-delete-livre'>Supprimer le livre</button>
                    </Link>

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
