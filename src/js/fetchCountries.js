import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupCountry, markupCountryList } from './markupCountry';

// Custom styles for notifications

Notify.init({
  position: 'center-center',
  showOnlyTheLastOne: true,
  timeout: 2000,
  fontSize: '20px',
});

// Function to fetch countries by name

export const fetchCountries = name => {
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
    });
};
