// Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faUsers, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
       <div className='rau'>
        <hr />
       <li><FontAwesomeIcon icon={faList} /><a href="/reservation">Liste des Reservation</a></li>
       <hr />
        <li><FontAwesomeIcon icon={faUsers} /><a href="/users">Users</a></li>
        <hr />
        <li><FontAwesomeIcon icon={faPlus} /><a href="/addproduct">Ajouter un produit</a></li>
        </div>
        <hr />
        <div className='logout'>
        <li><FontAwesomeIcon icon={faSignOutAlt} /><a href="/logout">Logout</a></li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
