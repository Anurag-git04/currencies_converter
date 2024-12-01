import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  // Fetch exchange rates and currencies
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await axios.get(
          `https://api.apilayer.com/exchangerates_data/latest?base=USD`,
          {
            headers: { apikey: "PMDN95NBLDtcG24wjwG3QLgBz8rEwSE0" }, // Replace with your API key
          }
        );
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, [toCurrency]);

  // Update result when amount, exchange rate, or currencies change
  useEffect(() => {
    if (amount && exchangeRate) {
      setResult((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleConvert = () => {
    setResult((amount * exchangeRate).toFixed(2));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      {/* <h2>Currency Converter</h2> */}
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          style={{ margin: "10px", padding: "5px", width: "120px" }}
        />
      </div>
      <div>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ margin: "10px", padding: "5px" }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ margin: "10px", padding: "5px" }}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleConvert}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Convert
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>
          {amount} {fromCurrency} = {result} {toCurrency}
        </h3>
      </div>
    </div>
  );
};

export default CurrencyConverter;
