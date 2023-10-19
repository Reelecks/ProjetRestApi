import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './LivreById.css';

const LivreById = () => {
    const {isbn} = useParams();
    const [livreData, setLivreData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios.get(`http://localhost:4000/livres/${isbn}`)
        .then(response => {
            console.log(response);
          setLivreData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Erreur de chargement des détails du livre', error);
          setIsLoading(false);
        });
    }, [isbn]);
  
    return (
      <div className='livre'>
        <div className='livre-header-list'>
        </div>
        {isLoading ? (
          <p>Chargement...</p>
          ) : (
          <div>
              <ul>
                <p><strong>Titre: </strong>{livreData.Titre}</p>
                <p><strong>AuteurID: </strong>{livreData.AuteurID}</p>
                <div>
                    <Link to={`/delete-livre/${livreData.ISBN}`}>
                        <button className='btn-delete-livre'>Supprimer le livre</button>
                    </Link>

                    <Link to={`/delete-livre/${livreData.ISBN}`}>
                        <button className='btn-edit-livre'>Mettre à jour les infos du livre</button>
                    </Link>
                </div>
              </ul>
            </div>
          )
        }
      </div>
    );
}


export default LivreById;
