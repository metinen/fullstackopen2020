import React from 'react';

const countryDetails = ({ weatherForecast, country }) => {
    console.log("Country details", weatherForecast)
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <p>Languages:</p>
            <ul>
                {country.languages.map(e => <li key={e.name}>{e.name}</li>)}
            </ul>
            <img src={country.flag} width="50px" height="50px" alt="Country flag" />
            {weatherForecast && weatherForecast.current &&
                <>
                    <p>Temperature:</p>
                    <p> {weatherForecast.current.temperature}</p>
                    <p>Wind:</p>
                    <p> {weatherForecast.current.wind}</p>
                </>
            }
        </div>
    );
};

export default countryDetails;