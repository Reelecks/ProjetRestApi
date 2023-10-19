import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ListLivre from './Pages/ListLivres/ListLivre';
import LivreById from './Pages/LivreById/LivreById';
import ListUtilisateurs from './Pages/Utilisateurs/ListUtilisateurs';
import Retards from './Pages/Retards/Retards';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ListLivre/>} />
          <Route path="/livres" element={<ListLivre/>} />
          <Route path="/livres/:isbn" element={<LivreById/>} />
          <Route path="/utilisateurs" element={<ListUtilisateurs/>} />
          <Route path="/retards" element={<Retards/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

