import { countryList, countryInfo } from '../index';

// Function to markup information about searched country

const markupCountry = country => {
  // If more then one language, need to string list of languages
  const countryLanguages = Object.values(country.languages);
  const languagesToString = countryLanguages
    .map(language => {
      return `${language}`;
    })
    .join(', ');

  // Markup
  const markupCountryInfo = `
        <div class="country-title">
        <img src="${country.flags.svg}">
        <p>${country.name.common}</p>
        </div>        
        <p><span>Capital: </span>${country.capital}</p>
        <p><span>Population: </span>${country.population}</p>
        <p><span>Languages: </span>${languagesToString}</p>        
        `;

  countryList.innerHTML = '';
  countryInfo.innerHTML = markupCountryInfo;

  // Custom styles

  const countryTitle = document.querySelector('.country-title');
  const countryFlag = document.querySelector('.country-title img');
  const countryName = document.querySelector('.country-title p');
  const countryKeys = document.querySelectorAll('span');

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
};

// Function to markup list of countries

const markupCountryList = countries => {
  // Markup
  countryList.style.listStyle = 'none';
  const markupListOfCountries = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}"><p>${country.name.common}</p></li>`;
    })
    .join('');

  countryList.innerHTML = markupListOfCountries;
  countryInfo.innerHTML = '';

  // Custom styles
  const countryItems = document.querySelectorAll('.country-list li');
  const countryFlags = document.querySelectorAll('.country-list img');
  const countryNames = document.querySelectorAll('.country-list p');

  countryItems.forEach(countryItem => {
    countryItem.style.display = 'flex';
    countryItem.style.alignItems = 'center';
    countryItem.style.marginBottom = '10px';
  });

  countryFlags.forEach(countryFlag => {
    countryFlag.style.marginRight = '20px';
    countryFlag.style.display = 'block';
    countryFlag.style.width = '60px';
    countryFlag.style.maxWidth = '100%';
    countryFlag.style.height = 'auto';
  });

  countryNames.forEach(countryName => {
    countryName.style.margin = '0';
    countryName.style.fontWeight = '400';
    countryName.style.fontSize = '20px';
  });
};

export { markupCountry, markupCountryList };
