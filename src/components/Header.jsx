import React from 'react';
import { Wrapp } from './Header.styled';
import { format } from 'date-fns';
import { HeaderTitle } from './Header.styled';

export const Header = ({
  currencyOne,
  currencyTwo,
  amountTwo,
  amountOne,
  formatCurrency,
  lastExchangeRate,
}) => {
  const isAmountOneValid = !isNaN(parseFloat(amountOne));
  const isAmountTwoValid = !isNaN(parseFloat(amountTwo));

  const shouldDisplayRate = isAmountOneValid && isAmountTwoValid && amountOne !== '0';
  const exchangeRate = shouldDisplayRate
    ? formatCurrency(amountTwo / amountOne)
    : formatCurrency(lastExchangeRate);
  
  return (
    <Wrapp>
      <HeaderTitle>React Currency Converter</HeaderTitle>
      <p>1 {currencyOne} equals </p>
      <p>
      {shouldDisplayRate ? exchangeRate : formatCurrency(lastExchangeRate)} {currencyTwo}
      </p>
      <p>{format(new Date(), 'dd/MM/yyyy hh:mm')}</p>
    </Wrapp>
  );
};
