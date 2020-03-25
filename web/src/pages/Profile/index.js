import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import Logo from '../../assets/logo.svg';


export default function Profile() {
  const history = useHistory();

  if(!localStorage.getItem("ongId")) {
    history.push("/")
  }

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    try{
      api.get("/profile",{
        headers: {
          Authorization: ongId
        }
      }).then(response => {
        setIncidents(response.data)
      })
    }catch(err){
      alert(err.response.data.error);
    }
  },[ongId])

  async function handleDeleteIncident(id) {
    try{
      if(window.confirm("Tem certeza disso ?")){
        await api.delete(`/incidents/${id}`, {
          headers: {
            Authorization: ongId
          }
        });
        const refreshList = incidents.filter(incident => incident.id !== id);
        setIncidents(refreshList);
      }      
    }catch(err) {
      alert(err.response.data.error);
    }
  }

  function handleLogOut() {
    localStorage.clear();
    history.push("/")
  }

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="logo"/>
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
       {
         incidents.length > 0 ? (
          incidents.map(incident => (          
            <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {
                Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' })
                .format(incident.value)
              }
            </p>
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
         ))) : "Não há casos cadastras"        
       }       
      </ul>
    </div>
  );
}
