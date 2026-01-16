const API_KEY = import.meta.env.VITE_API_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';



export const getCurrentWeather = async (lat: number, lon: number) => {
    const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`);
    if(!response.ok) {
        throw new Error('Falha ao carregar o clima atual da cidade.');
    }

    return await response.json();
}

export const getForecastWeather = async (lat: number, lon: number) => {
    const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`);
    if(!response.ok) {
        throw new Error('Falha ao carregar a previsão do tempo da cidade.');
    }
    return await response.json();
}

