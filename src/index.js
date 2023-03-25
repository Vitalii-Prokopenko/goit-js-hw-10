import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

Notify.init({
  position: 'center-top',
  showOnlyTheLastOne: true,
});

const DEBOUNCE_DELAY = 300;

const body = document.querySelector('body');
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

body.style.backgroundColor = 'lightgray';

// Function to render list of countries

const renderListOfCountries = countries => {
  const markup = countries
    .map(country => {
      return `<li>${country.name.common}</li>`;
    })
    .join('');
  countryList.innerHTML = markup;
};

// Function to fetch countries by name

const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      //   renderListOfCountries(data);
      const numberOfCountries = data.length;
      console.log(numberOfCountries);
      const countries = data;

      if (numberOfCountries > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (numberOfCountries > 1) {
        const markupListOfCountries = countries
          .map(country => {
            return `<li>${country.name.common}</li>`;
          })
          .join('');
        countryList.innerHTML = markupListOfCountries;
        countryInfo.innerHTML = '';
      } else if (numberOfCountries === 1) {
        const searchedCountry = data[0];
        const languagesOfCountry = searchedCountry.languages;
        console.log(languagesOfCountry);
        const listOfLanguages = Object.values(languagesOfCountry);
        console.log(listOfLanguages);

        const markupLanguages = listOfLanguages
          .map(language => {
            return `${language}`;
          })
          .join(', ');

        console.log(searchedCountry.flags.svg);

        const markupSearchedCountry = `
        <div class="country-title">
        <img src="${searchedCountry.flags.svg}">
        <p>${searchedCountry.name.common}</p>
        </div>        
        <p><span>Capital: </span>${searchedCountry.capital}</p>
        <p><span>Population: </span>${searchedCountry.population}</p>
        <p><span>Languages: </span>${markupLanguages}</p>        
        `;

        countryList.innerHTML = '';
        countryInfo.innerHTML = markupSearchedCountry;

        const countryTitle = document.querySelector('.country-title');
        const countryFlag = document.querySelector('.country-title img');
        const countryName = document.querySelector('.country-title p');
        const countryKeys = document.querySelectorAll('span');
        console.log(countryKeys);

        countryTitle.style.display = 'flex';
        countryFlag.style.marginRight = '20px';
        countryFlag.style.height = '45px';
        countryFlag.style.width = 'auto';
        countryName.style.margin = '0';
        countryName.style.fontWeight = '700';
        countryName.style.fontSize = '30px';

        countryKeys.forEach(countryKey => {
          countryKey.style.fontWeight = '700';
        });
      } else {
        Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// Function to handle input

const handleInput = event => {
  if (!event.currentTarget) {
    return;
  }
  //   console.log(event.currentTarget.value);
  const inputTextCleared = event.currentTarget.value.trim();
  //   console.log(inputTextCleared);
  fetchCountries(inputTextCleared);
};

// searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
searchBox.addEventListener('input', handleInput);
