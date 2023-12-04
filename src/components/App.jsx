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
  const [exchangeRates, setExchangeRates] = useState({
    [`${currencyOne}_${currencyTwo}`]: 1,
    [`${currencyTwo}_${currencyOne}`]: 1,
  });

  useEffect(() => {
    if (
      currencyRates[currencyOne] !== undefined &&
      currencyRates[currencyTwo] !== undefined
    ) {
      setExchangeRates(prevRates => ({
        ...prevRates,
        [`${currencyOne}_${currencyTwo}`]:
          currencyRates[currencyTwo] / currencyRates[currencyOne],
        [`${currencyTwo}_${currencyOne}`]:
          currencyRates[currencyOne] / currencyRates[currencyTwo],
      }));
    }
  }, [currencyOne, currencyTwo, currencyRates]);

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
        if (
          !isNaN(parsedAmount) ||
          inputValue === '' ||
          inputValue === '.' ||
          inputValue === '0'
        ) {
          const newAmountTwo = formatCurrency(
            (parsedAmount * currencyRates[currencyTwo]) /
              currencyRates[currencyOne]
          );
          setAmountTwo(newAmountTwo);

          return inputValue;
        }
        return prevAmountOne;
      });
    },
    [formatCurrency, currencyRates, currencyTwo, currencyOne]
  );

  useEffect(() => {
    if (!!currencyRates) {
      handleAmountOneChange({ target: { value: amountOne } });
    }
  }, [amountOne, currencyRates, handleAmountOneChange]);

  const handleAmountTwoChange = useCallback(
    event => {
      const inputValue = event.target.value;
      setAmountTwo(prevAmountTwo => {
        const parsedAmount = parseFloat(inputValue);

        if (
          !isNaN(parsedAmount) ||
          inputValue === '' ||
          inputValue === '.' ||
          inputValue === '0'
        ) {
          const newAmountOne = formatCurrency(
            (parsedAmount * currencyRates[currencyOne]) /
              currencyRates[currencyTwo]
          );
          setAmountOne(newAmountOne);

          return inputValue;
        }
        return prevAmountTwo;
      });
    },
    [currencyRates, currencyOne, currencyTwo, formatCurrency]
  );

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
        amountOne={amountOne}
        amountTwo={amountTwo}
        currencyOne={currencyOne}
        currencyTwo={currencyTwo}
        formatCurrency={formatCurrency}
        currencyRates={currencyRates}
        exchangeRateOneToTwo={exchangeRates[`${currencyOne}_${currencyTwo}`]}
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
