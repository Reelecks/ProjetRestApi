import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListUtilisateurs.css';

const ListUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:4000/livres/emprunts')
      .then(response => {
        setUtilisateurs(response.data);
      })
      .catch(error => {
        console.error('Erreur de chargement des utilisateurs', error);
      });
  }, []);

  return (

    <div className='container-list-livres'>
      <div className='header-list-livres'>
        <h1 className='title-page'>Liste des utilisateurs qui ont emprunté un livre</h1>
        <div>
          <ul>
            {utilisateurs.map(utilisateur => (
              <li>
                <li className='list-utilisateurs' key={utilisateur.ID}></li>
                <h2 className='nom-utilisateurs'>{utilisateur.Nom}</h2>     
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListUtilisateurs;
