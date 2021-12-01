import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import Error from "./Error";

import useMoneda from "../hooks/useMoneda";
import useCripto from "../hooks/useCripto";

const Form = ({ guardarMoneda, guardarCripto }) => {
  //state del listadp de cripto
  const [listado, guardarCriptos] = useState([]);

  //State para validar el formulari
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //utilizar use moneda
  const [moneda, SelectMonedas] = useMoneda("Selecciona Moneda", "", MONEDAS);

  // utilizar cripto
  const [cripto, SelectCripto] = useCripto("Selecciona Cripto", "", listado);

  // llamado a la api

  useEffect(() => {
    const getApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultados = await axios.get(url);

      guardarCriptos(resultados.data.Data);
    };
    getApi();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar si ambos campos estan llenos
    if (moneda === "" || cripto === "") {
      guardarError(true);
      return;
    }

    //pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCripto(cripto);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectCripto />
      <SelectMonedas />
      <Btn type="submit" value="Calcular" />
    </form>
  );
};

const Btn = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export default Form;
