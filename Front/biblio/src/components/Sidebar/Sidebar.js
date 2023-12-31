import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="ul-sidebar">
          <li className="li-sidebar">
              <Link className="a-sidebar" to="/livres">Livres</Link>
          </li>

          <li className="li-sidebar">
              <Link className="a-sidebar" to="/utilisateurs">Utilisateurs</Link>
          </li>
          <li className="li-sidebar">
              <Link className="a-sidebar" to="/retards">Retards</Link>
          </li>
      </ul>
    </div>
  );
};

export default Sidebar;
