import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/countryDetails';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [weatherForecast, setWeatherForecast] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const data = response.data;
        setCountries(countries.concat(data));
        setCountriesToShow(countries.concat(data));
      });
  }, [])

  const fetchWeatherForecast = (country) => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        console.log(response.data)
        setWeatherForecast(response.data);
      });
  }

  const shouldFetchWeatherForecast = (newCountriesToShow) => newCountriesToShow.length === 1 && weatherForecast.location?.country !== newCountriesToShow[0].name;

  const handleOnChange = (event) => {
    event.preventDefault();
    const input = event.target.value;
    setNewCountry(input);
    const newCountriesToShow = countries.filter(e => e.name.toUpperCase().includes(input.toUpperCase()));
    setCountriesToShow(newCountriesToShow);
    if (shouldFetchWeatherForecast(countriesToShow)) {
      fetchWeatherForecast(newCountriesToShow[0]);
    }
  }

  const handleClick = (alpha2Code) => {
    const newCountriesToShow = countriesToShow.filter(e => e.alpha2Code === alpha2Code)
    setCountriesToShow(newCountriesToShow);
    if (shouldFetchWeatherForecast(newCountriesToShow)) {
      fetchWeatherForecast(newCountriesToShow[0]);
    }
  }

  const getCountryInfo = () => {
    console.log("Get country info", weatherForecast)
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      return <CountryDetails weatherForecast={weatherForecast} country={country} />
    } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      return <div>
        <p>Countries:</p>
        <ul>
          {countriesToShow.map(e => <li key={e.alpha2Code}>{e.name}
            <button onClick={() => handleClick(e.alpha2Code)}>Show</button></li>)}
        </ul>
      </div>
    } else if (countriesToShow.length > 10) {
      return <p>Too many matches, specify filter</p>
    };
  }

  return (
    <div >
      <div> Find countries
      <input value={newCountry} onChange={handleOnChange} />
      </div>
      <div>
        {getCountryInfo()}
      </div>
    </div>
  )
}

export default App;
