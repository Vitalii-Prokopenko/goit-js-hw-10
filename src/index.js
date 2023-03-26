import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const body = document.querySelector('body');
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export { countryList, countryInfo };

body.style.backgroundColor = '#DCDCDC';

// Function to handle input

const handleInput = event => {
  if (event.currentTarget.value === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    const inputTextCleared = event.currentTarget.value.trim();
    fetchCountries(inputTextCleared);
  }
};

searchBox.addEventListener(
  'input',
  debounce(handleInput, DEBOUNCE_DELAY, {
    leading: true,
    trailing: false,
  })
);
