// src/Pages/Register.js
import React, { useState } from 'react';
import { useSalonContext } from '../Context/SalonContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { employees, setEmployees } = useSalonContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert('Заполните все поля');
      return;
    }

    const existing = employees.find(emp => emp.name === name);
    if (existing) {
      alert('Сотрудник с таким именем уже существует');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      name,
      password,
      role: 'master',
    };

    setEmployees(prev => [...prev, newEmployee]);
    alert('Сотрудник успешно зарегистрирован!');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Регистрация сотрудника</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя сотрудника"
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
        <button type="submit">Зарегистрироваться</button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          Уже есть аккаунт?{' '}
          <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;