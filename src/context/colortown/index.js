/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const ColorTownContext = createContext();

export const ColorTownProvider = ({ children }) => {
  const [ctColors, setCtColors] = useState(
    // eslint-disable-next-line no-array-constructor
    JSON.parse(localStorage.getItem("ctColors")) || new Array()
  );
  const [ctGradients, setCtGradients] = useState(
    JSON.parse(localStorage.getItem("ctGradients") || [null])
  );
  const [ctPalettes, setCtPalettes] = useState(
    JSON.parse(localStorage.getItem("ctPalettes") || [null])
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
    ctGradients,
    ctPalettes,
    setCtColors,
    setCtGradients,
    setCtPalettes,
  };
  return <ColorTownContext.Provider value={values}>{children}</ColorTownContext.Provider>;
};

export const useColorTown = () => useContext(ColorTownContext);
