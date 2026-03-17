// src/Pages/Login.js
import React, { useState } from 'react';
import { useSalonContext } from '../Context/SalonContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { loginEmployee } = useSalonContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = loginEmployee(name, password);
    if (employee) {
      localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
      navigate('/appointments');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Вход для сотрудников</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Войти</button>
      </form>

      {/* 👇 ДОБАВЬ ЭТОТ БЛОК */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          Еще нет аккаунта?{' '}
          <a
            href="/register"
            style={{
              color: '#1976d2',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;