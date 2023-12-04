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
      // console.log('Handling 0 or empty value:', numericValue);
      onAmountChange({ target: { value: numericValue } });
    } else if (!isNaN(parseFloat(numericValue))) {
      // console.log('Handling numeric value:', numericValue);
      onAmountChange({ target: { value: numericValue } });
    } else {
      // console.log('Not handling:', numericValue);
    }
  };

  return (
    <Group>
      <Input
        type="text"
        name="value"
        value={amount.toString()}
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
