import React from 'react';
import { Wrapp } from './Header.styled';
import { format } from 'date-fns';
import { HeaderTitle } from './Header.styled';

export const Header = ({
  amountOne,
  amountTwo,
  currencyOne,
  currencyTwo,
  formatCurrency,
  exchangeRateOneToTwo,
}) => {
  return (
    <Wrapp>
      <HeaderTitle>React Currency Converter</HeaderTitle>
      {exchangeRateOneToTwo !== 1 && (
        <>
          <p>1 {currencyOne} equals </p>
          <p>
            {amountOne &&
            amountTwo !== '' &&
            amountOne !== '0' &&
            amountTwo !== '0'
              ? formatCurrency(exchangeRateOneToTwo)
              : formatCurrency(exchangeRateOneToTwo)}{' '}
            {currencyTwo}
          </p>
        </>
      )}
      <p>{format(new Date(), 'dd/MM/yyyy hh:mm')}</p>
    </Wrapp>
  );
};
