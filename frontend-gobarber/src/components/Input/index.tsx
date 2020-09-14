import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons'; // são as proprieades que um ícone pode ter

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // pode receber as propriedades que o meu ícone vai ter
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  // Icon com letra maiuscula pq estou convertendo o nome para uma variavel de componente
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
};

export default Input;
