import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import Imagejs from "./components/Imagejs";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Currencies convertor</h1>
      <CurrencyConverter />
      <Imagejs />
    </div>
  );
};

export default App;
