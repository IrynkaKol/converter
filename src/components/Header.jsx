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
  
  return (
    <Wrapp>
      <HeaderTitle>React Currency Converter</HeaderTitle>
      <p>1 {currencyOne} equals </p>
      <p>
      {amountOne && amountTwo
          ? formatCurrency(amountTwo / amountOne)
          : formatCurrency(lastExchangeRate)}{' '}
        {currencyTwo}
      </p>
      <p>{format(new Date(), 'dd/MM/yyyy hh:mm')}</p>
    </Wrapp>
  );
};
