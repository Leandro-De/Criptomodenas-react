import React from "react";
import styled from "@emotion/styled";

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;
  return (
    <Resultado>
      <Precio>
        El precio es: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        El precio mas alto del dia: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        El precio mas bajo del dia: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Ultima Actualización: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </Resultado>
  );
};

const Resultado = styled.div`
  color: #fff;
  font-family: "Courier New", Courier, monospace;
`;

const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Precio = styled.p`
  font-size: 30px;
`;

export default Cotizacion;
