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
  return (
    <Group>
      <Input
        type="text"
        name="value"
        value={amount.toString()}
        onChange={(e)  => {
          const numericValue = e.target.value.replace(/[^0-9.]/g, '');
          onAmountChange({target: {value: numericValue}})
        }
        }
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
