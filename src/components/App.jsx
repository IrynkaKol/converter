import axios from 'axios';
import {format} from "date-fns";
import { useState, useEffect, useCallback  } from 'react';
import { CurrencyInput } from './CurrencyInout';

const API_KEY = process.env.REACT_APP_API_KEY;
const CURRENCY_API = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

export const App = () => {
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1);
  const [currencyOne, setCurrencyOne] = useState('USD');
  const [currencyTwo, setCurrencyTwo] = useState('UAH');
  const [currencyRates, setCurrencyRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(CURRENCY_API)
      .then(response => {
        console.log('API Response:', response.data);
        setCurrencyRates(response.data.rates);
      })
      .catch(err => {
        console.error('API Error:', err);
        setCurrencyRates(null);
        setError('Failed to load currency rates. Please try again later.')
      });
  }, []);
  

  const formatCurrency = useCallback((number) => {
    return number.toFixed(2)
  }, [])

  const handleAmountOneChange = useCallback((amountOne) => {
    setAmountTwo(
      formatCurrency((amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne])
    );
    setAmountOne(amountOne);
  }, [currencyRates, currencyTwo, currencyOne, setAmountTwo, formatCurrency]);

  useEffect(()=> {
    if(!!currencyRates) {
      handleAmountOneChange(1);
    }
    
  }, [currencyRates, handleAmountOneChange]);

  

  const handleAmountTwoChange = (amountTwo) => {
    setAmountOne(
      formatCurrency((amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo])
    );
    setAmountTwo(amountTwo);
  };

  const handleCurrencyOneChange = currencyOne => {
    setAmountTwo(
      formatCurrency((amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne])
    );
    setCurrencyOne(currencyOne);
  };

  const handleCurrencyTwoChange = currencyTwo => {
    setAmountOne(
      formatCurrency((amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo])
    );
    setCurrencyTwo(currencyTwo);
  };

  if (error) return <p>{error}</p>;

  if (!currencyRates) return <p>Somesing went wrong</p>

  if (currencyRates.length === 0 ) return <p>Loading...</p>
  return (
    <div
    style={{
      
    }}
    >
      <h1>React Currency Converter</h1>
      <p>1 {currencyOne} equils </p>
      <p>{formatCurrency(amountTwo / amountOne)} {currencyTwo}</p>
      <p>{format(new Date(), "dd/mm/yyyy hh:mm")}</p>
      <CurrencyInput
        amount={amountOne}
        currency={currencyOne}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
      />
      <CurrencyInput
        amount={amountTwo}
        currency={currencyTwo}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
      />
    </div>
  );
};
