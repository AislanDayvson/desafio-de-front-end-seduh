import CloudSun from '../assets/icons/BsCloudSun.svg'
import CloudSunBlack from '../assets/icons/BsCloudSunBlack.svg'

import Sun from '../assets/icons/BsSun.svg'
import SunBlack from '../assets/icons/BsSunBlack.svg'

import Moon from '../assets/icons/BsMoon.svg'
import MoonBlack from '../assets/icons/BsMoonBlack.svg'

import Drizzle from '../assets/icons/BsCloudDrizzle.svg'
import DrizzleBlack from '../assets/icons/BsCloudDrizzleBlack.svg'

import Clouds from '../assets/icons/BsCloudy.svg'
import CloudsBlack from '../assets/icons/BsCloudFill.svg'

import Snow from '../assets/icons/BsCloudSnow.svg'
import SnowBlack from '../assets/icons/BsCloudSnowBlack.svg'

import Rain from '../assets/icons/BsCloudRain.svg'
import RainBlack from '../assets/icons/BsCloudRainBlack.svg'

import type { CurrentWeatherResponse, ForecastItem, ForecastResponse } from '../types/weather'



import { useState, useEffect } from 'react'
import { cities } from '../data/cities'
import { getCurrentWeather, getForecastWeather } from '../services/weatherAPI'
import { useParams } from 'react-router-dom'

const CityWeather = () => {
const { id } = useParams<{ id: string }>();
const [weatherData, setWeatherData] = useState<CurrentWeatherResponse | null >(null)
const [forecastData, setForecastData] = useState<ForecastResponse | null>(null)
const [loading, setLoading] = useState<boolean>(true)
const [error, setError] = useState<string | null>(null)

const city = cities.find(c => c.id === id)

  useEffect(() => {
    if (!city) {
      setError("Cidade não encontrada.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getCurrentWeather(city.lat, city.lon)
      .then((data) => {
        setWeatherData(data);

      })
      .catch(() => {
        setError("Falha ao carregar os dados do clima.");
      })
      .finally(() => {
        setLoading(false);
      });

    getForecastWeather(city.lat, city.lon)
      .then((data) => {
        setForecastData(data);
      })
      .catch(() => {
        setError("Falha ao carregar a previsão do tempo.");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [city]);
  
  
function formatHour(seconds: number) {
  return new Date(seconds * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}


if (loading) {
    return <div>Loading...</div>
}
if (error) {
    return <div>{error}</div>
}

if (!weatherData) {
    return <div>Carregando dados.</div>
}



let weatherIcon = Sun; 
let weatherIconBlack = SunBlack;

  switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherIcon = Clouds;
                weatherIconBlack = CloudsBlack;
                break;
            case 'Snow':
                weatherIcon = Snow;
                weatherIconBlack = SnowBlack;
                break;
            case 'Clear':
                weatherIcon = Sun;
                weatherIconBlack = SunBlack;
                break;
            case 'Rain':
                weatherIcon = Rain;
                weatherIconBlack = RainBlack;
                break;
            case 'Drizzle':
                weatherIcon = Drizzle;
                weatherIconBlack = DrizzleBlack;
                break;
            case 'Mist':
                weatherIcon = CloudSun;
                weatherIconBlack = CloudSunBlack;
                break;
}                                     

const isNegativeTemp = weatherData.main.temp < 0;

const mainWeatherIcon = isNegativeTemp ? weatherIconBlack : weatherIcon;

const dawnIcon = isNegativeTemp ? CloudSunBlack : CloudSun;
const morningIcon = isNegativeTemp ? SunBlack : Sun;
const afternoonIcon = isNegativeTemp ? CloudSunBlack : CloudSun;
const nightIcon = isNegativeTemp ? MoonBlack : Moon;

const listForecast: ForecastItem[] = forecastData?.list ?? [];

const dawn = listForecast.find((item: any) => item.dt_txt.includes("03:00"));
const morning = listForecast.find((item: any) => item.dt_txt.includes("09:00"));
const afternoon = listForecast.find((item: any) => item.dt_txt.includes("15:00"));
const night = listForecast.find((item: any) => item.dt_txt.includes("21:00"));


  return (
    <div className={`weather-screen ${isNegativeTemp ? "cold" : "default"}`}>
      <div className="weather-container">

        <h1 className="city-name">
          {city?.name}
        </h1>
        <p className="weather-condition">{weatherData.weather[0].main} </p>

        <div className="temperature">
          <span className="temp-value">{Math.round(weatherData.main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>

              <div className="temp-range">
                <span>↑ {Math.round(weatherData.main.temp_max)}°</span>
                <span>↓ {Math.round(weatherData.main.temp_min)}°</span>
              </div>
  

        <div className="main-icon">
          <img src={mainWeatherIcon} className='weather-icon' height="120px" alt="" />
        </div>

        <div className="periods">
          <div className="period">
            <span>Dawn</span>
            <img src={dawnIcon} height="48px"/>
            <span>{dawn ? Math.round(dawn.main.temp) : "--"} °C</span>
          </div>

          <div className="period">
            <span>Morning</span>
            <img src={morningIcon} height="48px" />
            <span>{morning ? Math.round(morning.main.temp) : "--"} °C</span>
          </div>

          <div className="period">
            <span>Afternoon</span>
            <img src={afternoonIcon} height="48px"/>
            <span>{afternoon ? Math.round(afternoon.main.temp) : "--"} °C °C</span>
          </div>

          <div className="period">
            <span>Night</span>
            <img src={nightIcon} height="48px"/>
            <span>{night ? Math.round(night.main.temp) : "--"} °C °C</span>
          </div>
        </div>

        <div className="details">
            <div className="detail-item">
                <span>Wind speed</span>
                <strong>{weatherData.wind.speed} m/s</strong>
            </div>

            <div className="detail-item">
                <span>Sunrise</span>
                <strong>{formatHour(weatherData.sys.sunrise)}</strong>
            </div>

            <div className="detail-item">
                <span>Sunset</span>
                <strong>{formatHour(weatherData.sys.sunset)}</strong>
            </div>

            <div className="detail-item">
                <span>Humidity</span>
                <strong>{weatherData.main.humidity} %</strong>
            </div>
        </div>


      </div>
    </div>
  );
}


export default CityWeather
