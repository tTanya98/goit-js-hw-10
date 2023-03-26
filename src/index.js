import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchField.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    // e.preventDefault();
    let inputCountry = e.target.value.trim();
    if(inputCountry) {
        return fetchCountries(inputCountry)
        .then(data => {
            choseMarkup(data);
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        });
    }
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}

function choseMarkup(countryArray) {
    if (countryArray.length === 1) {
        countryList.innerHTML = '';
        return markupCountry(countryArray);
    }
    if (countryArray.length >= 2 && countryArray.length <= 10) {
        countryInfo.innerHTML = '';
        return markupCountryItm(countryArray);
    }
    return Notify.info('Too many matches found. Please enter a more specific name.');
}

function markupCountryItm(data) {
    const markup = data
    .map(el => {
        return `<li class="country-list_item">
                <img class="country-list_img" src="${el.flags.svg}" alt="${el.name.official}" width="40" height="20" />
                <p>${el.name.official}</p>
                </li>`;
    })
    .join('');
    countryList.innerHTML = markup;
}

function markupCountry(data) {
    const markup = data
    .map(el => {
        return `<h1>
        <img class="country-list_img" 
        src="${el.flags.svg}" 
        alt="${el.name.official}" width="40" height="20" />
        ${el.name.official}
        </h1>
        <ul class="country-info_list">
            <li class="country-info_item">
            <h2>Capital:</h2>
            <p>${el.capital}</p>
            </li>
            <li class="country-info_item">
            <h2>Population:</h2>
            <p>${el.population}</p>
            </li>
            <li class="country-info_item">
            <h2>Languages:</h2>
            <p>${Object.values(el.languages).join(', ')}</p>
            </li>
        </ul>`;
    })
    .join('');
    countryInfo.innerHTML = markup;
}