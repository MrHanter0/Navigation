// src/Pages/Appointments.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSalonContext } from '../Context/SalonContext';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { getMasterAppointments } = useSalonContext();
  const navigate = useNavigate();


  const loggedInEmployee = useMemo(() => {
    const data = localStorage.getItem('loggedInEmployee');
    return data ? JSON.parse(data) : null;
  }, []);

  useEffect(() => {
    if (loggedInEmployee) {
      setAppointments(getMasterAppointments(loggedInEmployee.id));
    }
  }, [getMasterAppointments, loggedInEmployee?.id]);

  const handleCreateNew = () => {
    navigate('/create-appointment');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ваши записи</h2>
      <button onClick={handleCreateNew}>Создать новую запись</button>
      <br /><br />

      {appointments.length === 0 ? (
        <p>У вас пока нет записей.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {appointments.map(app => (
            <div
              key={app.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '8px',
                width: '300px',
              }}
            >
              <h4>Клиент: {app.clientId}</h4>
              <p>Услуга: {app.service}</p>
              <p>Время: {new Date(app.time).toLocaleString()}</p>
              <p>Статус: {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;