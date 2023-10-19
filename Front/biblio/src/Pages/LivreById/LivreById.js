import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModifyLivre from '../../components/PopUp/ModifyLivre';
import axios from 'axios';
import './LivreById.css';

const LivreById = () => {
    const { isbn } = useParams();
    const [livreData, setLivreData] = useState({});
    const [auteurs, setAuteurs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editeurs, setEditeurs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModifyLivre, setShowModifyLivre] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [livreResponse, auteursResponse, categoriesResponse, editeursResponse] = await Promise.all([
                    axios.get(`http://localhost:4000/livres/${isbn}`),
                    axios.get('http://localhost:4000/auteurs'),
                    axios.get('http://localhost:4000/categories'),
                    axios.get('http://localhost:4000/editeurs')
                ]);

                setLivreData(livreResponse.data);
                setAuteurs(auteursResponse.data);
                setCategories(categoriesResponse.data);
                setEditeurs(editeursResponse.data);

                setIsLoading(false);
            } catch (error) {
                console.error('Erreur de chargement des détails du livre', error);
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [isbn, reload]);

    const findNameById = (type, id) => {
      if (type === 'auteur') {
          const found = auteurs.find(item => item.ID === id);
          return found ? `${found.Nom} ${found.Prenom}` : '';
      } else if (type === 'categorie') {
          const found = categories.find(item => item.ID === id);
          return found ? found.NomCategorie : '';
      } else if (type === 'editeur') {
          const found = editeurs.find(item => item.ID === id);
          return found ? found.NomEditeur : '';
      }
      return '';
  };
  

    return (
        <div className='livre'>
            <div className='livre-header-list'></div>
            {isLoading ? (
                <p>Chargement...</p>
            ) : (
                <div>
                    <ul>
                        <p><strong>Titre : </strong>{livreData.Titre}</p>
                        <p><strong>Auteur : </strong>{livreData.AuteurID} - {findNameById('auteur', livreData.AuteurID)}</p>
                        <p><strong>Année de publication : </strong>{livreData.AnneePublication}</p>
                        <p><strong>Nombre de livres disponibles : </strong>{livreData.QuantiteDisponible}</p>
                        <p><strong>Catégorie : </strong>{livreData.CategorieID} - {findNameById('categorie', livreData.CategorieID)}</p>
                        <p><strong>Éditeur : </strong>{livreData.EditeurID} - {findNameById('editeur', livreData.EditeurID)}</p>

                        <div className="button-container">
                            <div className="button-wrapper"> 
                              <Link to={`/delete-livre/${livreData.ISBN}`}>
                                <button className="button" type="button">
                                  <span className="button__text">Delete</span>
                                  <span className="button__icon"><svg className="svg" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" styles="fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><line styles="stroke:#ffffff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px" x1="80" x2="432" y1="112" y2="112"></line><path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" styles="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path><line styles="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="256" x2="256" y1="176" y2="400"></line><line styles="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="184" x2="192" y1="176" y2="400"></line><line styles="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="328" x2="320" y1="176" y2="400"></line></svg></span>
                                </button>
                              </Link>
                                <button className='btn-modify-livre btn-edit-livre' onClick={() => setShowModifyLivre(true)}>
                                    Mettre a jour les informations
                                </button>
                                {showModifyLivre && <ModifyLivre livre={livreData} onClose={() => setShowModifyLivre(false)} onModified={() => setReload(prev => !prev)}/>}
                            </div>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LivreById;