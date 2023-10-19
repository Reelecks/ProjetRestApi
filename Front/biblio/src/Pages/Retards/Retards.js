import React, { useState, useEffect } from 'react';
import './Retards.css'; 
import axios from 'axios';

function Retards() {
  const [retards, setRetards] = useState([]);
  const [listeUtilisateurs, setListeUtilisateurs] = useState([]);
  const [listeLivres, setListeLivres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/livres/emprunts/retards')
      .then(response => {
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


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const daysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((endDate - startDate) / oneDay);
  };

 
  return (
    <div className='retards-container'>
      <h1>Liste des Retards</h1>
      <div className='cards-container'>
        {retards.map((retard) => {
          const livre = listeLivres.find(l => l.ISBN === retard.LivreISBN);
          const utilisateur = listeUtilisateurs.find(u => u.ID === retard.UtilisateurID);
          const retardInDays = daysBetweenDates(new Date(retard.DateRetourPrevu), new Date());
          return (
            <div key={retard.ID} className="card">
              <h2>{livre ? livre.Titre : 'Livre inconnu'}</h2>
              <p>{utilisateur ? `${utilisateur.Prenom} ${utilisateur.Nom}` : 'Utilisateur inconnu'}</p>
              <p>Date de retour prévu: {formatDate(retard.DateRetourPrevu)}</p>
              <p>{retardInDays > 0 ? `En retard de ${retardInDays} jours` : 'Pas encore en retard'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Retards;