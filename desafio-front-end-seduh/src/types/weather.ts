export interface CurrentWeatherResponse {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
}


export interface ForecastItem {
  dt_txt: string; 
  main: {
    temp: number;
  };
}

export interface ForecastResponse {
  list: ForecastItem[];
}
