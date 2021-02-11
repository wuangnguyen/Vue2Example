export const restrictTextCharacter = $event => {
  const keyCode = $event.keyCode;
  const key = $event.key;

  if (
    // Allow: back, delete, esc, enter, delete, dot (Num Lock)
    [8, 9, 27, 13, 46, 110].includes(keyCode) ||
    // Allow: dot, comma
    ([188, 190].includes(keyCode) && !$event.shiftKey) ||
    // Allow: Shif+[PageUp, PageDown, End, Home, Arrow Left, Arrow Up, Arrow Right, Arrow Down, Insert, Delete]
    ([33, 34, 35, 36, 37, 38, 39, 40, 45, 46].includes(keyCode) && $event.shiftKey) ||
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Command+A, Ctrl+Insert, Ctrl+Home, Ctrl+PageUp, Ctrl+PageDown, Ctrl+End, Ctrl+Delete,
    ([65, 86, 67, 45, 36, 33, 34, 35, 46].includes(keyCode) && ($event.ctrlKey || $event.metaKey)) ||
    // Allow: home, end, left, right, down, up
    (keyCode >= 35 && keyCode <= 40)
  ) {
    // let it happen, don't do anything
    return;
  }

  // Ensure that it is a number and stop the keypress
  if (($event.shiftKey || keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105)) {
    $event.preventDefault();
  }

  // prevent length input exceed 10 when not exist decimal and thousand separator
  const value = $event.target.value;
  const decimalSeparator = getDecimalSeparator();
  const thousandSeparator = getThousandSeparator();
  if (
    value &&
    value.indexOf(decimalSeparator) === -1 &&
    value.indexOf(thousandSeparator) === -1 &&
    (($event.target.selectionEnd === maxLength10 && decimalSeparator !== key) ||
      (value.length >= maxLength10 && $event.target.selectionEnd < maxLength10 && ![thousandSeparator, decimalSeparator].includes(key)))
  ) {
    $event.preventDefault();
  }
};

export const getValidMaxLength = value => {
  const decimalSeparator = getDecimalSeparator();
  const thousandSeparator = getThousandSeparator();

  if (value && (value.indexOf(decimalSeparator) >= 0 || value.indexOf(thousandSeparator) >= 0)) {
    // Additional length characters in decimal separator part ".{precision}"
    return maxLength13;
  }

  return maxLength10;
};
const defaultCurrencyCode = 'VND';
const styleCurrency = 'currency';
const precision = 0;

const maxLength13 = 13;
const maxLength10 = 10;

function getDecimalSeparator() {
  return (1.1).toLocaleString('vi').substring(1, 2);
}

function getThousandSeparator() {
  return (1000).toLocaleString('vi').substring(1, 2);
}

function getCurrencySymbol() {
  var formatter = new Intl.NumberFormat('vi', {
    style: styleCurrency,
    currency: defaultCurrencyCode,
    minimumFractionDigits: 0
  });

  var currencyFormatString = formatter.format('0');
  var currencySymbol = currencyFormatString[0];

  if (!isNaN(currencySymbol)) {
    currencySymbol = currencyFormatString[currencyFormatString.length - 1];
  }

  return currencySymbol;
}

export const unFormat = value => {
  if (!isCurrency(value)) {
    return value;
  }

  const decimalSeparator = getDecimalSeparator();
  const thousandSeparator = getThousandSeparator();
  const currencySymbol = getCurrencySymbol();
  const number = parseFloat(
    value
      .toString()
      .replace(new RegExp('\\' + currencySymbol, 'g'), '')
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.')
  ).toFixed(precision);

  return number;
};

function intlNumberFormat(styleCurrency, currencyCode) {
  if (styleCurrency) {
    return new Intl.NumberFormat('vi', {
      style: styleCurrency,
      currency: currencyCode || defaultCurrencyCode,
      minimumFractionDigits: precision
    });
  }

  return new Intl.NumberFormat('vi', {
    minimumFractionDigits: precision
  });
}

export const format = (value, styleCurrency, currencyCode) => {
  if (styleCurrency) {
    return formatCurrency(value, styleCurrency, currencyCode);
  }

  const thousandSeparator = getThousandSeparator();
  return formatCurrency(value).replace(new RegExp('\\' + thousandSeparator, 'g'), '');
};

export const formatCurrency = (value, styleCurrency, currencyCode) => {
  const newValue = value ? value.toString().trim() : '';

  if (newValue && !isNaN(newValue)) {
    const formatter = intlNumberFormat(styleCurrency | 'currency', currencyCode);
    return formatter.format(parseFloat(newValue).toFixed(precision));
  }

  return value;
};

export const isCurrency = value => {
  if (!value) {
    return false;
  }

  const decimalSeparator = getDecimalSeparator();
  const thousandSeparator = getThousandSeparator();
  const matchRegex = `(?=.)^(([1-9][0-9]{0,2}([\\${thousandSeparator}][0-9]{3})*)|[0-9]+)?(\\${decimalSeparator}\\d+)?$`;
  const isValid = value.toString().match(matchRegex) !== null;

  return isValid;
};
