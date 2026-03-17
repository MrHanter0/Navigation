// src/Pages/CreateAppointment.jsx
import React, { useState, useMemo } from 'react';
import { useSalonContext } from '../Context/SalonContext';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const [clientId, setClientId] = useState('');
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const { clients, addAppointment } = useSalonContext();
  const navigate = useNavigate();

  // ✅ Мемоизируем результат парсинга - вычисляется 1 раз при монтировании
  const loggedInEmployee = useMemo(() => {
    const data = localStorage.getItem('loggedInEmployee');
    return data ? JSON.parse(data) : null;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientId || !service || !time) {
      alert('Заполните все поля');
      return;
    }

    addAppointment({
      clientId: parseInt(clientId),
      service,
      time,
      employeeId: loggedInEmployee?.id,
      status: 'pending',
    });

    alert('Запись создана!');
    navigate('/appointments');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Создать запись</h2>
      <form onSubmit={handleSubmit}>
        <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
          <option value="">Выберите клиента</option>
          {clients?.map(client => (
            <option key={client.id} value={client.id}>
              {client.name} ({client.phone})
            </option>
          ))}
        </select>
        <br /><br />

        <div>
          <label>Услуга:</label><br />
          <input
            type="radio"
            name="service"
            value="Стрижка"
            onChange={(e) => setService(e.target.value)}
          /> Стрижка<br />
          <input
            type="radio"
            name="service"
            value="Окрашивание"
            onChange={(e) => setService(e.target.value)}
          /> Окрашивание<br />
          <input
            type="radio"
            name="service"
            value="Маникюр"
            onChange={(e) => setService(e.target.value)}
          /> Маникюр<br />
        </div>
        <br />

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Создать запись</button>
      </form>
    </div>
  );
};

export default CreateAppointment;