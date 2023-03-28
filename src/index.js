import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { markupCountry, markupCountryList } from './js/markupCountry';

const DEBOUNCE_DELAY = 300;

const body = document.querySelector('body');
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export { countryList, countryInfo };

body.style.backgroundColor = '#DCDCDC';

// Custom styles for notifications

Notify.init({
  position: 'center-center',
  showOnlyTheLastOne: true,
  timeout: 2000,
  fontSize: '20px',
});

// Function to handle input

const handleInput = event => {
  if (event.currentTarget.value === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    const inputTextCleared = event.currentTarget.value.trim();

    fetchCountries(inputTextCleared)
      .then(data => {
        const countries = data;
        const numberOfCountries = data.length;

        if (numberOfCountries > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (numberOfCountries > 1) {
          markupCountryList(countries);
        } else if (numberOfCountries === 1) {
          markupCountry(data[0]);
        }
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  }
};

searchBox.addEventListener(
  'input',
  debounce(handleInput, DEBOUNCE_DELAY, {
    leading: true,
    trailing: false,
  })
);
