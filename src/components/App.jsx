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
  const [lastExchangeRate, setLastExchangeRate] = useState(1);
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

  const formatCurrency = useCallback(number => {
    const numericValue = parseFloat(number);
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
    return '';
  }, []);

  const handleAmountOneChange = useCallback(
    event => {
      const inputValue = event.target.value;
      setAmountOne(prevAmountOne => {
        const parsedAmount = parseFloat(inputValue);
        if (!isNaN(parsedAmount) || inputValue === '' || inputValue === '.') {
          const newAmountTwo = formatCurrency(
            (parsedAmount * currencyRates[currencyTwo]) /
              currencyRates[currencyOne]
          );
          setAmountTwo(newAmountTwo);

          setLastExchangeRate(currencyRates[currencyTwo]);

          return inputValue;
        }
        return prevAmountOne;
      });
    },
    [currencyRates, currencyTwo, currencyOne, setAmountTwo, formatCurrency]
  );

  useEffect(() => {
    if (!!currencyRates) {
      handleAmountOneChange({ target: { value: 1 } });
    }
  }, [currencyRates, handleAmountOneChange]);

  const handleAmountTwoChange = useCallback(
    event => {
      const inputValue = event.target.value;
      setAmountTwo(prevAmountTwo => {
        const parsedAmount = parseFloat(inputValue);
        if (!isNaN(parsedAmount) || inputValue === '' || inputValue === '.') {
          const newAmountOne = formatCurrency(
            (parsedAmount * currencyRates[currencyOne]) /
              currencyRates[currencyTwo]
          );
          setAmountOne(newAmountOne);

          setLastExchangeRate(currencyRates[currencyTwo]);

          return inputValue;
        }
        return prevAmountTwo;
      });
    },
    [currencyRates, currencyOne, currencyTwo, setAmountOne, formatCurrency]
  );
 

  const handleCurrencyOneChange = currencyOne => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setCurrencyOne(currencyOne);
    setLastExchangeRate(currencyRates[currencyTwo]);
  };

  const handleCurrencyTwoChange = currencyTwo => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setCurrencyTwo(currencyTwo);
    setLastExchangeRate(currencyRates[currencyTwo]);
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
        lastExchangeRate={lastExchangeRate}
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
