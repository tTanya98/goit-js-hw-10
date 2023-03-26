const URL = 'https://restcountries.com/v3.1/name/';
const PARAMETERS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?fields=${PARAMETERS}`).then(response => {
    if (!response.ok) {
    throw new Error('Data fail!');
  }
  return response.json();
  });
}