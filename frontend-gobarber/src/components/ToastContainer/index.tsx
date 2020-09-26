import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // primeiro parâmetros são as messages
  // o segundo é uma função que vai obter qual é a key da minha mensagem
  // e o ultimo é um objeto contendo minhas animações
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      // posição inicial
      from: { right: '-120%', opacity: '0' },
      // qual vai ser a posição quando entrar em tela
      enter: { right: '0%', opacity: '1' },
      // estilização quando sair de tela
      leave: { right: '-120%', opacity: '0' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map((
        { item, key, props }, // dentro do props tem a estilização, item é  msg por completo
      ) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
