const URL = 'https://restcountries.com';
const PARAMETERS = 'name,capital,population,flags,languages';

const fetchCountries = function (name) {
  return fetch(`${URL}${name}?fields=${PARAMETERS}`).then(
    response => {
      if (!response.ok) {
        throw new Error('Data fail!');
      }
      return response.json();
    }
  );
};

export { fetchCountries };