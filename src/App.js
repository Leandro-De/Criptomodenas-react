import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import Cotizacion from "./components/Cotizacion";
import axios from "axios";

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [cripto, guardarCripto] = useState("");
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizarCripto = async () => {
      //evitamos la ejecucion de primera vez
      if (moneda === "") return;

      //consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      setResultado(resultado.data.DISPLAY[cripto][moneda]);
    };
    cotizarCripto();
  }, [moneda, cripto]);

  return (
    <>
      <Container>
        <div>
          <Imagen src={image} />
        </div>

        <div>
          <Header>Cotiza Criptomonedas al Instante</Header>
          <Form guardarMoneda={guardarMoneda} guardarCripto={guardarCripto} />
          <Cotizacion resultado={resultado} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Header = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

export default App;
