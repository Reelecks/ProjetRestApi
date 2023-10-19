import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ListLivre from './Pages/ListLivres/ListLivre';
import DeleteLivre from './Pages/DeleteLivre/DeleteLivre';
import LivreById from './Pages/LivreById/LivreById';
import ListUtilisateurs from './Pages/Utilisateurs/ListUtilisateurs';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          {/* <Route path="/" element={<ListLivre/>} /> */}
          <Route path="/livres" element={<ListLivre/>} />
          <Route path="/delete-livres/:isbn" element={<DeleteLivre/>} />
          <Route path="/livres/:isbn" element={<LivreById/>} />
          <Route path="/utilisateurs" element={<ListUtilisateurs/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

