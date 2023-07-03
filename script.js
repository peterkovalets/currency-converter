'use strict';

const changeThemeBtn = document.querySelector('#change-theme-btn');
const themeIcon = document.querySelector('#theme-icon');
const selects = document.querySelectorAll('.select');
const form = document.querySelector('#form');
const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const amountInput = document.querySelector('#amount');
const resultContainer = document.querySelector('#result');

let isDarkMode = false;
const currenciesList = [
  'AED',
  'AFN',
  'XCD',
  'ALL',
  'AMD',
  'ANG',
  'AOA',
  'AQD',
  'ARS',
  'AUD',
  'AZN',
  'BAM',
  'BBD',
  'BDT',
  'XOF',
  'BGN',
  'BHD',
  'BIF',
  'BMD',
  'BND',
  'BOB',
  'BRL',
  'BSD',
  'NOK',
  'BWP',
  'BYR',
  'BZD',
  'CAD',
  'CDF',
  'XAF',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CRC',
  'CUP',
  'CVE',
  'CYP',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'ECS',
  'EEK',
  'EGP',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'GBP',
  'GEL',
  'GGP',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'GYD',
  'HKD',
  'HNL',
  'HRK',
  'HTG',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KPW',
  'KRW',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LTL',
  'LVL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MMK',
  'MNT',
  'MOP',
  'MRO',
  'MTL',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'XPF',
  'NGN',
  'NIO',
  'NPR',
  'NZD',
  'OMR',
  'PAB',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'QAR',
  'RON',
  'RSD',
  'RUB',
  'RWF',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEK',
  'SGD',
  'SKK',
  'SLL',
  'SOS',
  'SRD',
  'STD',
  'SVC',
  'SYP',
  'SZL',
  'THB',
  'TJS',
  'TMT',
  'TND',
  'TOP',
  'TRY',
  'TTD',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'USD',
  'UYU',
  'UZS',
  'VEF',
  'VND',
  'VUV',
  'YER',
  'ZAR',
  'ZMK',
  'ZWD',
];
const API_URL =
  'https://v6.exchangerate-api.com/v6/646c7f964180a40ab7e9c46b/latest';

function toggleTheme() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    themeIcon.src = 'images/sun.png';
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.src = 'images/moon.png';
  }

  localStorage.setItem('theme', isDarkMode);
}

function loadTheme() {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'true') {
      toggleTheme();
    }
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    toggleTheme();
  }
}

function makeCurrencySelects() {
  selects.forEach((select) => {
    select.innerHTML = '';
    currenciesList.forEach((currency) => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      select.insertAdjacentElement('beforeend', option);

      if (
        (select.name === 'from' && currency === 'USD') ||
        (select.name === 'to' && currency === 'EUR')
      ) {
        option.selected = true;
      }
    });
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  const response = await fetch(`${API_URL}/${fromSelect.value}`);
  const data = await response.json();
  const exchangeRate = data.conversion_rates[toSelect.value];
  const convertedValue = (exchangeRate * Number(amountInput.value)).toFixed(2);
  resultContainer.classList.remove('hidden');
  resultContainer.textContent = `${amountInput.value} ${fromSelect.value} = ${convertedValue} ${toSelect.value}`;
}

loadTheme();
makeCurrencySelects();

changeThemeBtn.addEventListener('click', toggleTheme);
form.addEventListener('submit', handleSubmit);
