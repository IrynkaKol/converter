import React from 'react';
import { Wrapp } from './Header.styled';
import { format } from 'date-fns';
import { HeaderTitle } from './Header.styled';

export const Header = ({
  currencyOne,
  amountTwo,
  amountOne,
  currencyTwo,
  formatCurrency,
}) => {
  return (
    <Wrapp>
      <HeaderTitle>React Currency Converter</HeaderTitle>
      <p>1 {currencyOne} equils </p>
      <p>
        {formatCurrency(amountTwo / amountOne)} {currencyTwo}
      </p>
      <p>{format(new Date(), 'dd/MM/yyyy hh:mm')}</p>
    </Wrapp>
  );
};
