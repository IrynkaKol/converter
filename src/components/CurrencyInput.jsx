import PropTypes from 'prop-types';
import { Group, Input, Select } from '../components/CurrencyInput.styled';

export const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onCurrencyChange,
  onAmountChange
}) => {
  const displayedCurrencies = currencies.filter(currency =>
    ['USD', 'EUR', 'UAH', 'CZK', 'GBP'].includes(currency)
  );

  const handleAmountChange = (e) => {
    let inputValue = e.target.value;
  
    // Replace the comma with a period, if it is present
    inputValue = inputValue.replace(',', '.');
  
    // Tests whether parseFloat can process the input value
    const isValidInput = /^\d*\.?\d*$/.test(inputValue);
    if (isValidInput) {
      onAmountChange(inputValue);
    }
  };

return (
<Group>
  <Input type="text" name="value" value={amount} onChange={handleAmountChange
  }/>
  <Select value={currency} onChange={e => onCurrencyChange(e.target.value)}>
    {displayedCurrencies.map((currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        )))}
    </Select>
  </Group>
)
}
CurrencyInput.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
}

/*
import PropTypes from 'prop-types';
import { Group, Input, Select } from '../components/CurrencyInput.styled';

export const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) => {
  const displayedCurrencies = currencies.filter(currency =>
    ['USD', 'EUR', 'UAH', 'CZK', 'GBP'].includes(currency)
  );
  const handleAmountInputChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    if (numericValue === '' || numericValue === '.' || numericValue === '0') {
      
      onAmountChange({ target: { value: numericValue } });
    } else if (!isNaN(parseFloat(numericValue))) {
      
      onAmountChange({ target: { value: numericValue } });
    } else {
      
    }
  };

  return (
    <Group>
      <Input
        type="text"
        name="value"
        value={amount === 0 ? '' : amount.toString()}
        onChange={handleAmountInputChange}
      />
      <Select
        name="currency"
        value={currency}
        onChange={e => onCurrencyChange(e.target.value)}
      >
        {displayedCurrencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
    </Group>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};
*/