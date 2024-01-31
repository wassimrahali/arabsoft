import React from 'react';
import './styles.css'; // Assuming you have a separate CSS file
import img from '../assets/img3.jpg';
import img2 from '../assets/ajir.jpg';
import img3 from '../assets/jibaya.jpg'
import img4 from '../assets/amin.jpg'

const PackingSolutions = () => {
  return (
    <>
    <h2 className='titre'>De quoi votre entreprise a-t-elle besoin ?</h2>
    <div className="container">
      <div className="d-flex">
        <div className="card flex-fill mr-3">
          <img className="card-img-top" src={img} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Xlia : Gestion Hôtelière</h4>
            <p className="card-text">
              XLIA est la solution de gestion hôtelière adaptée à toutes les catégories : hôtels de ville, hôtels balnéaires, hôtels club, villages de vacances, maisons d’hôtes, auberges, gîtes…
            </p>
            <a href="/xlia" className="responsive-button">
              <i className="fas fa-arrow-right custom-arrow"></i> 
            </a>
          </div>
        </div>
        <div className="card flex-fill">
          <img className="card-img-top" src={img2} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Ajir : GRH</h4>
            <p className="card-text">
              Ajir est la solution de gestion des ressources humaines adaptée aux besoins des entreprises. Elle offre des fonctionnalités avancées pour simplifier la gestion du personnel.
            </p>
            <a href="/ajir" className="responsive-button">
              <i className="fas fa-arrow-right custom-arrow"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="d-flex">
        <div className="card flex-fill mr-3">
          <img className="card-img-top" src={img3} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Xlia : Gestion Hôtelière</h4>
            <p className="card-text">
              XLIA est la solution de gestion hôtelière adaptée à toutes les catégories : hôtels de ville, hôtels balnéaires, hôtels club, villages de vacances, maisons d’hôtes, auberges, gîtes…
            </p>
            <a href="/xlia" className="responsive-button">
              <i className="fas fa-arrow-right custom-arrow"></i> 
            </a>
          </div>
        </div>
        <div className="card flex-fill">
          <img className="card-img-top" src={img4} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Ajir : GRH</h4>
            <p className="card-text">
              Ajir est la solution de gestion des ressources humaines adaptée aux besoins des entreprises. Elle offre des fonctionnalités avancées pour simplifier la gestion du personnel.
            </p>
            <a href="/ajir" className="responsive-button">
              <i className="fas fa-arrow-right custom-arrow"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PackingSolutions;
