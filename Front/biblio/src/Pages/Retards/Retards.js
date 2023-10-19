import React, { useState, useEffect } from 'react';
import './Retards.css'; // Importez votre fichier CSS si nécessaire
import axios from 'axios';

function Retards() {
  const [retards, setRetards] = useState([]);
  const [listeUtilisateurs, setListeUtilisateurs] = useState([]);
  const [listeLivres, setListeLivres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/livres/emprunts/retards')
      .then(response => {
        console.log(response.data);
        setRetards(response.data[0]);
      })
      .catch(error => {
        console.error('Erreur', error);
      });
    axios.get('http://localhost:4000/utilisateurs')
    .then(response => {
        setListeUtilisateurs(response.data);
      })
      .catch(error => {
        console.error('Erreur', error);
      });
      axios.get('http://localhost:4000/livres')
    .then(response => {
        setListeLivres(response.data);
      })
      .catch(error => {
        console.error('Erreur', error);
      });
  }, []);
        

  return (
    <div className='retards-container'>
      <h1>Liste des Retards</h1>
      <ul className='retards-list'>
      {retards.map((retard) => {
            const livre = listeLivres.find(l => l.ISBN === retard.LivreISBN);
            const utilisateur = listeUtilisateurs.find(u => u.ID === retard.UtilisateurID);
            return (
              <li key={retard.id}>
                <h2>{livre ? livre.Titre : 'Livre inconnu'}</h2>
                <h2>{utilisateur ? `${utilisateur.Prenom} ${utilisateur.Nom}` : 'Utilisateur inconnu'}</h2>
                <h2>{retard.DateRetard}</h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Retards;
