import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';

import Logo from '../../assets/logo.svg';


import './styles.css';

export default function NewIncident() {  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");

  if(!localStorage.getItem("ongId")) {
    history.push("/")
  }

  async function handleNewIncident(e) {
    e.preventDefault();
    try{
      await api.post("/incidents", {
        title,
        description,
        value
      }, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile")
    }catch(err) {
      alert(err.response.data.error);
    }
  }

  return (
    <div className="newincident-container">
    <div className="content">
      <section>
        <img src={Logo} alt="logo"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar
        </Link>   
      </section>
      <form onSubmit={handleNewIncident}>
        <input 
        type="text" 
        placeholder="Título do caso" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        />
        <textarea  
        placeholder="Descrição" 
        value={description}
        onChange={e => setDescription(e.target.value)}
        />
        <input 
        placeholder="Valor em reais" 
        value={value}
        onChange={e => setValue(e.target.value)}
        />       
        <button type="submit" className="button">Cadastrar</button>
      </form>
    </div>
  </div>
  );
}
