/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const ColorTownContext = createContext();

export const ColorTownProvider = ({ children }) => {
  const [ctColors, setCtColors] = useState(JSON.parse(localStorage.getItem("ctColors")) || []);
  const [ctGradients, setCtGradients] = useState(
    JSON.parse(localStorage.getItem("ctGradients") || [])
  );
  const [ctPalettes, setCtPalettes] = useState(
    JSON.parse(localStorage.getItem("ctPalettes") || [])
  );

  useEffect(() => {
    localStorage.setItem("ctColors", JSON.stringify(ctColors));
  }, [ctColors]);

  useEffect(() => {
    localStorage.setItem("ctGradients", JSON.stringify(ctGradients));
  }, [ctGradients]);

  useEffect(() => {
    localStorage.setItem("ctPalettes", JSON.stringify(ctPalettes));
  }, [ctPalettes]);

  const values = {
    ctColors,
    setCtColors,
    ctGradients,
    setCtGradients,
    ctPalettes,
    setCtPalettes,
  };

  return <ColorTownContext.Provider value={values}>{children}</ColorTownContext.Provider>;
};

export const useColorTown = () => useContext(ColorTownContext);
