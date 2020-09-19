import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);

    /* hackzinho para centralizar no icone */
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    /* flecha */
    &::before {
      /* para ser exibido em tele eu preciso do content mesmo que vazio */
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;

      /* triangulo */
      border-width: 6px 6px 0 6px;

      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
