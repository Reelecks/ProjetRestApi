import React, { useState, useEffect } from 'react';
import './Retards.css'; // Importez votre fichier CSS si nécessaire
import axios from 'axios';

function Retards() {
  const [retards, setRetards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/livres/emprunts/retards')
      .then(response => {
        console.log(response.data);
        setRetards(response.data);
      })
      .catch(error => {
        console.error('Erreur', error);
      });
  }, []);
        

  return (
    <div className='retards-container'>
      <h1>Liste des Retards</h1>
      <ul className='retards-list'>
        {retards.map((retard) => (
          <li key={retard.id}>
            <h2 className='text-start'>Livre ISBN : {retard.LivreISBN}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Retards;
