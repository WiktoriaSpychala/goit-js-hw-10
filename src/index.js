import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesName = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');
const debounced = debounce(searchCountries, DEBOUNCE_DELAY);

countriesName.addEventListener('input', debounced);

function searchCountries() {
    const countryNameTrim = countriesName.value.trim();
    countriesList.innerHTML = '';
    countriesInfo.innerHTML = '';
    if (countryNameTrim === '') {
        return;
    }
        fetchCountries(countryNameTrim)
          .then(name => renderCountries(name))
          .catch(error => console.log(error));
}
function renderCountries(name) {
    if (name.length > 10) {
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        return;
    }
    const markup = name
        .map(({ name, flags }) => {
            return `<li> <img src="${flags.svg}" alt="Flag of ${name.common}"
            height="30px" width="50px"> 
            <span>${name.common}</span>            
        </li>`;
        }).join('');
    countriesList.innerHTML = markup;

    if (name.length === 1) {
        const markupInfo = name.map(({ capital, population, languages }) => {
        return `<p> <b>Capital</b>: ${capital}</p>
        <p> <b>Population</b>: ${population}</p>
        <p> <b>Languages</b>: ${Object.values(languages)}</p>`;
        }).join('');
        countriesInfo.innerHTML = markupInfo;
        return;
    }
}