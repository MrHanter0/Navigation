// src/Context/SalonContext.js
import React, { createContext, useState, useContext } from 'react';

const SalonContext = createContext();

export const useSalonContext = () => useContext(SalonContext);

export const SalonProvider = ({ children }) => {
  // Инициализация данных
  const [employees, setEmployees] = useState([
    { id: 1, name: "Анна", password: "123", role: "master" },
    { id: 2, name: "Иван", password: "456", role: "master" },
  ]);

  const [clients, setClients] = useState([
    { id: 1, name: "Мария", phone: "+79001234567" },
    { id: 2, name: "Дмитрий", phone: "+79007654321" },
  ]);

  const [appointments, setAppointments] = useState([]);

  // Функция для добавления нового клиента
  const addClient = (client) => {
    setClients(prev => [...prev, { ...client, id: Date.now() }]);
  };

  // Функция для добавления записи
  const addAppointment = (appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now() }]);
  };

  // Функция для входа сотрудника
  const loginEmployee = (name, password) => {
    const employee = employees.find(emp => emp.name === name && emp.password === password);
    return employee || null;
  };

  // Получить записи конкретного мастера
  const getMasterAppointments = (employeeId) => {
    return appointments.filter(app => app.employeeId === employeeId);
  };

  const value = {
    employees,
    clients,
    appointments,
    addClient,
    addAppointment,
    loginEmployee,
    getMasterAppointments,
    setEmployees,
  };

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
};