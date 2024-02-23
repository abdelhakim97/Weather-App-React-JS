import './style/style.css'
import React, { useEffect, useState } from 'react';
import humidity from './img/humidity.png'
import getWeatherIcon from './WeatherInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch, faWind, faTemperature1 } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css'
import { Autocomplete, TextField } from '@mui/material';
import SevenDay from './SevenDay';
function App(props) {
    const [city, setcity] = useState()
    const [weatherInfo, setweatherInfo] = useState(null)
    const [weatherInfoForecasts, setweatherInfoForecasts] = useState(null)
    const [listCountry, setListCountry] = useState([]);
    const [inputSearch, setInputSearch] = useState();
    const [sevenDayForecast, setSevenDayForecast] = useState(null);
    const api = {
        key: "82eeda275a76da7977a498e0c20ece13",
        base: 'https://api.openweathermap.org/data/2.5',
        key_geoAutocomptete: "5461f70a8df748c585d68e50ca825379"
    }
    const getweather = (event, value) => {
        if (!value) {
            console.error('yes is null')
        } else {
            fetch(`${api.base}/weather?q=${value}&units=metric&appid=${api.key}`).then(
                (res) => { return res.json() }
            ).then(
                (resFinal) => {
                    if (Array.isArray(resFinal.weather) && resFinal.weather.length > 0) {


                        let icanweather = getWeatherIcon(resFinal.weather[0].icon);

                        const weatherInfos = {
                            location: resFinal.name,
                            temperature: Math.round(resFinal.main.temp) + '°C',
                            feelsLike: Math.round(resFinal.main.feels_like) + '°C',
                            humidity: resFinal.main.humidity + '%',
                            wind: resFinal.wind.speed + "Km/h",
                            condition: resFinal.weather[0].description,
                            icons: icanweather
                        }
                        setweatherInfo(weatherInfos)
                        fetch(`${api.base}/forecast?q=${resFinal.name}&units=metric&appid=${api.key}`)
                            .then((res) => res.json())
                            .then((resFinal) => {
                                const hourlyForecasts = resFinal.list.slice(0, 4);
                                const weatherInfos = hourlyForecasts.map((forecast) => {
                                    let forecastIcon = getWeatherIcon(forecast.weather[0].icon);
                                    return {
                                        time: forecast.dt_txt.slice(11, 16).trim(),
                                        temperature: Math.round(forecast.main.temp),
                                        condition: forecast.weather[0].description,
                                        icon: forecastIcon,
                                    };
                                });
                                setweatherInfoForecasts(weatherInfos);
                            });
                             // Fetch seven-day forecast
                             fetch(`${api.base}/forecast?q=${resFinal.name}&units=metric&appid=${api.key}`)
                             .then((res) => res.json())
                             .then((resFinal) => {

                                 const dailyForecasts = resFinal.list.filter((forecast, index) => index % 8 === 0);
                                 const weatherInfos2 = dailyForecasts.map((forecast) => {

                                     let forecastIcon_sevenday2 = getWeatherIcon(forecast.weather[0].icon);

                                     return {
                                         day: new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
                                         temperature: Math.round(forecast.main.temp),
                                         condition: forecast.weather[0].description,
                                         icon: forecastIcon_sevenday2,
                                     };
                                 });

                                 setSevenDayForecast(weatherInfos2);
                             });


                    } else {
                        alert('please choose the correct name of city ! ')
                    }

                }
            )
        }

    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`${api.base}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
                        .then((res) => res.json())
                        .then((resFinal) => {
                            let icanweather = getWeatherIcon(resFinal.weather[0].icon);
                            const weatherInfos = {
                                location: resFinal.name,
                                temperature: Math.round(resFinal.main.temp) + '°C',
                                feelsLike: Math.round(resFinal.main.feels_like) + '°C',
                                humidity: resFinal.main.humidity + '% ',
                                wind: resFinal.wind.speed + 'Km/h',
                                condition: resFinal.weather[0].description,
                                icons: icanweather,
                            };
                            setweatherInfo(weatherInfos);
                            fetch(`${api.base}/forecast?q=${resFinal.name}&units=metric&appid=${api.key}`)
                                .then((res) => res.json())
                                .then((resFinal) => {
                                    const hourlyForecasts = resFinal.list.slice(0, 4);

                                    const weatherInfos = hourlyForecasts.map((forecast) => {
                                        let forecastIcon2 = getWeatherIcon(forecast.weather[0].icon);
                                        return {
                                            time: forecast.dt_txt.slice(11, 16).trim(),
                                            temperature: Math.round(forecast.main.temp),
                                            condition: forecast.weather[0].description,
                                            icon: forecastIcon2,
                                        };
                                    });

                                    setweatherInfoForecasts(weatherInfos);
                                });

                            // Fetch seven-day forecast
                            fetch(`${api.base}/forecast?q=${resFinal.name}&units=metric&appid=${api.key}`)
                                .then((res) => res.json())
                                .then((resFinal) => {

                                    const dailyForecasts = resFinal.list.filter((forecast, index) => index % 8 === 0);
                                    const weatherInfos2 = dailyForecasts.map((forecast) => {

                                        let forecastIcon_sevenday2 = getWeatherIcon(forecast.weather[0].icon);

                                        return {
                                            day: new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
                                            temperature: Math.round(forecast.main.temp),
                                            condition: forecast.weather[0].description,
                                            icon: forecastIcon_sevenday2,
                                        };
                                    });

                                    setSevenDayForecast(weatherInfos2);
                                });
                        });
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }, []);
    function handleInputChange(event, value) {

        setInputSearch(value)

        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${api.key_geoAutocomptete}`)
            .then((res) => res.json())
            .then((resF) => {
                // Extract city names from the API response
                const cities = resF.features.map((feature) => feature.properties.formatted);
                setListCountry(cities);

            })
            .catch((error) => {
                console.error('Error fetching city suggestions:', error);
            });


    }



    return (
        <div className='div_index'>

            <main className='main_search'>

                <nav className='location'><FontAwesomeIcon icon={faLocationDot} />   {weatherInfo && weatherInfo.location}</nav>

                <main className='div_search' >
                    <div className="search-input-container">
                        {/* <input type="text" className="search-input" placeholder="Search..." onChange={(e) => setcity(e.target.value)} value={city} /> */}
                        <Autocomplete
                            onInputChange={handleInputChange}
                            onChange={getweather}
                            id="combo-box-demo"
                            options={listCountry}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search" />}
                        />
                        {/* <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={getweather} /> */}
                    </div>
                </main>

            </main>
            <nav className='nav_img_weather'>
                <img src={weatherInfo && weatherInfo.icons} alt="" width={200} />
            </nav>
            <nav className='temp'>
                <span className='nb_temp' >{weatherInfo && weatherInfo.temperature}</span>
                <p>{weatherInfo && weatherInfo.condition}</p>
            </nav>
            <nav className='info_wearher'>
                <main className='info_W' >
                    <nav>
                        <FontAwesomeIcon icon={faWind} /><br />
                        {weatherInfo && weatherInfo.wind}
                        <p>Wind</p>
                    </nav>

                    <nav className='vertical-hr'></nav>

                    <nav>
                        <img src={humidity} alt="" width={25} /><br />
                        {weatherInfo && weatherInfo.humidity}
                        <p>Humidity</p>
                    </nav>

                    <nav className='vertical-hr'></nav>

                    <nav>
                        <FontAwesomeIcon icon={faTemperature1} /><br />
                        {weatherInfo && weatherInfo.feelsLike}
                        <p>FeelsLike</p>
                    </nav>
                </main>
            </nav>
            <div className='div_Today'>
                <div>
                    <nav><p id='Today'>Today</p></nav>
                    <nav><p id='days' onClick={() => window.scrollTo(0, document.body.scrollHeight)} >5 days &#9660;</p></nav>
                </div>
            </div>
            <div className='weather_forecast'>
                {
                    weatherInfoForecasts && weatherInfoForecasts.map(value => {
                        return (
                            <nav>
                                <span id='temp_'>{value.temperature}°C</span> <br />
                                <img src={value.icon} alt="" width={47} /> <br />
                                <span id='time'>{value.time}</span>
                            </nav>
                        )
                    })

                }
            </div>
            {
                sevenDayForecast && sevenDayForecast.map(value =>
                    <SevenDay img_s={value.icon} day={value.day} contition={value.condition} temp={value.temperature} />

                )
            }
        </div>
    );
}

export default App;