import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import Logo from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try{
      const response = await api.post("/sessions", {id});
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    }catch(err){
      alert(err.response.data.error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={Logo} alt="logo"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
          type="text" 
          placeholder="Seu ID" 
          value={id}
          onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho login
          </Link>
        </form>
      </section>
      <img src={HeroesImg} alt="heroes"/>
    </div>
  );
}
