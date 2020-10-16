import React from 'react';
import { View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


import {useAuth} from '../hooks/auth'

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <ActivityIndicator size="large" color="#ff9000" />
      </View>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes /> // se tem usuario logado mostra app routes (privadas) se nao authroutes
};

export default Routes;
