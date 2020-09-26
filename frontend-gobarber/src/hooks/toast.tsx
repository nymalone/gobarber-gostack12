/* eslint-disable no-console */
import React, { createContext, useCallback, useContext, useState } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData); // inicializo como um objeto vazio

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // aqui começo a criar os meus métodos
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// hook
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  // se o context não existir, o que quer dizer que usei o useToast fora de um component com o Toast Provider
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
