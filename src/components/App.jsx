import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Container } from '../components/App.styled';
import { CurrencyInput } from './CurrencyInput';
import { Header } from './Header';

const CURRENCY_API = 'https://open.er-api.com/v6/latest';

export const App = () => {
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1);
  const [currencyOne, setCurrencyOne] = useState('USD');
  const [currencyTwo, setCurrencyTwo] = useState('UAH');
  const [currencyRates, setCurrencyRates] = useState([]);
  const [error, setError] = useState(null);
  const [changedInput, setChangedInput] = useState(null); // Saving the value of the changed input

  // Getting currency exchange rates
  useEffect(() => {
    axios.get(CURRENCY_API).then(response => {
      setCurrencyRates(response.data.rates);
    })
    .catch(err => {
      console.error('API Error:', err);
      setCurrencyRates(null);
      setError('Failed to load currency rates. Please try again later.');
    });
  }, []);

  // The function for formatting a number into currency format
  function formatCurrency(number) {
    return number.toFixed(2);
  }

  // Function to change the currency of the first input
  const handleCurrencyOneChange = useCallback(
    currencyOne => {
      setCurrencyOne(currencyOne);
      setChangedInput('amountOne'); // Setting the flag for currency change in the first input
    },
    []
  );

  // Function to change the currency of the second input
  const handleCurrencyTwoChange = useCallback(
    currencyTwo => {
      setCurrencyTwo(currencyTwo);
      setChangedInput('amountTwo'); // Setting the flag for currency change in the second input
    },
    []
  );

  // Updating the value of the first input upon currency change
  useEffect(() => {
    if (!currencyRates || Object.keys(currencyRates).length === 0 || changedInput !== 'amountOne') {
      return;
    }
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
  }, [currencyRates, amountOne, currencyOne, currencyTwo, changedInput]);

  // Updating the value of the second input upon currency change
  useEffect(() => {
    if (!currencyRates || Object.keys(currencyRates).length === 0 || changedInput !== 'amountTwo') {
      return;
    }
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
  }, [currencyRates, amountTwo, currencyOne, currencyTwo, changedInput]);

  // Initial value upon page load
  useEffect(() => {
    if (!currencyRates || Object.keys(currencyRates).length === 0) {
      return;
    }
    
    setAmountOne(1);
    setAmountTwo(formatCurrency(currencyRates[currencyTwo]));
  }, [currencyRates, currencyTwo]);

  // Function to change the value of the first input
  const handleAmountOneChange = useCallback(
    amountOne => {
      setAmountOne(amountOne);
      setChangedInput('amountOne'); 
    },
    []
  );

  // Function to change the value of the second input
  const handleAmountTwoChange = useCallback(
    amountTwo => {
      setAmountTwo(amountTwo);
      setChangedInput('amountTwo'); 
        },
    []
  );

  return (
    <Container>
      {error && <p>{error}</p>}
      <Header
        currencyOne={currencyOne}
        currencyTwo={currencyTwo}
        amountOne={amountOne}
        currencyRates={currencyRates}
        formatCurrency={formatCurrency}
      />
      <CurrencyInput
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
        currencies={Object.keys(currencyRates)}
        amount={amountOne}
        currency={currencyOne}
      />
      <CurrencyInput
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
        currencies={Object.keys(currencyRates)}
        amount={amountTwo}
        currency={currencyTwo}
      />
    </Container>
  );
};

