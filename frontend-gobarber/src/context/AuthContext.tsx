import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  // para conseguir autenticação eu preciso receber minhas credenciais
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    }); // minha rota de criação no back

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Nykolle', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
