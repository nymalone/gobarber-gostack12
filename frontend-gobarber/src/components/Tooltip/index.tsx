import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string; // esse title é o que vai aparecer quando eu passar o mouse por cima do ícone de error
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
