import { Container } from '../components/App.styled';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    axios
      .get(CURRENCY_API)
      .then(response => {
        setCurrencyRates(response.data.rates);
      })
      .catch(err => {
        console.error('API Error:', err);
        setCurrencyRates(null);
        setError('Failed to load currency rates. Please try again later.');
      });
  }, []);

  const formatCurrency = useCallback((number) => {
    const numericValue = parseFloat(number);
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
    return '';
  }, []);

  const handleAmountOneChange = useCallback(
    amountOne => {
      const parsedAmount = parseFloat(amountOne);
      if (!isNaN(parsedAmount)) {
        setAmountTwo(
          formatCurrency(
            (parsedAmount * currencyRates[currencyTwo]) / currencyRates[currencyOne]
          )
        );
      }
      
      setAmountOne(formatCurrency(parsedAmount));
    },
    [currencyRates, currencyTwo, currencyOne, setAmountTwo, formatCurrency]
  );

  useEffect(() => {
    if (!!currencyRates) {
      handleAmountOneChange(1);
    }
  }, [currencyRates, handleAmountOneChange]);

  const handleAmountTwoChange = amountTwo => {
    const parsedAmount = parseFloat(amountTwo);
    if (!isNaN(parsedAmount)) {
      setAmountOne(
        formatCurrency(
          (parsedAmount * currencyRates[currencyOne]) / currencyRates[currencyTwo]
        )
      );
    }
    
    setAmountTwo(formatCurrency(parsedAmount));
  };

  const handleCurrencyOneChange = currencyOne => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setCurrencyOne(currencyOne);
  };

  const handleCurrencyTwoChange = currencyTwo => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setCurrencyTwo(currencyTwo);
  };

  if (error) return <p>{error}</p>;

  if (!currencyRates) return <p>Somesing went wrong</p>;

  if (currencyRates.length === 0) return <p>Loading...</p>;

  return (
    <Container>
      <Header
        currencyOne={currencyOne}
        amountTwo={amountTwo}
        amountOne={amountOne}
        currencyTwo={currencyTwo}
        formatCurrency={formatCurrency}
      />
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
    </Container>
  );
};
