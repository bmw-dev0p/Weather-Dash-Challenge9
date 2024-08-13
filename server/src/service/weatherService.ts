import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  wind: string;
  humidity: number;
  icon: string;
  

  constructor(city: string, temperature: number, wind: string, humidity: number, icon: string) {
    this.city = city;
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL?: string;
  apiKey?: string;
  cityName?: string;

  constructor () {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  async fetchLocationData(query: string) {
    try{
      console.log('query: ', query);
      console.log('----------------------------------');
    const response = await fetch(query);
    const data = await response.json();
    return data.coord
  }
  catch (err) {
    console.log('Error: Unable to fetchLocationData', err);
    return err;
  }
}
  // TODO: Create destructureLocationData method
  // takes in Coordinates object and returns latitude and longitude
  private destructureLocationData(locationData: Coordinates): Coordinates {
    try{
      const {  lon, lat } = locationData;
      return { lon, lat};
    } catch (err) {
      console.log('Error: Unable to destructureLocationData', err);
      return { lon: 0, lat: 0 }; // Return default coordinates
    } 
  }
  // TODO: Create buildGeocodeQuery method
  //create query based on city name
  private buildGeocodeQuery(): string {
    try{
      return `${this.baseURL}/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}`;
    } catch (err) {
      console.log('Error: Unable to buildGeocodeQuery', err);
      return ''; // Return empty string
    }
  }
  // TODO: Create buildWeatherQuery method
  //takes in coordinates object and returns lat long based query
  private buildWeatherQuery(coordinates: Coordinates): string {
    try {
      const { lon, lat } = coordinates;
      return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    } catch (err) {
      console.log('Error: Unable to buildWeatherQuery', err);
      return ''; // Return empty string
  }
}
  // TODO: Create fetchAndDestructureLocationData method
  //fetches location data (on city name) and returns destructured coordinates
  // private async fetchAndDestructureLocationData() {
  //   try{
  //     const query = this.buildGeocodeQuery();
  //     const locationData = await this.fetchLocationData(query);
  //     return this.destructureLocationData(locationData);
  //   } catch (err) {
  //     console.log('Error: Unable to fetchAndDestructureLocationData', err);
  //     return { latitude: 0, longitude: 0 }; // Return default coordinates
  //   }
  // }
  // TODO: Create fetchWeatherData method
  // creates a fetch request for weather data based on coordinates (after building query)
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const query = this.buildWeatherQuery(coordinates);
      const response = await fetch(query);
      return await response.json();
    } catch (err) {
      console.log('Error: Unable to fetchWeatherData', err);
      return err;
  }
}
  // TODO: Build parseCurrentWeather method
  //takes in query response and returns Weather object with data
  private parseCurrentWeather(response: any) {
    try {
      console.log('response: ', response);
      const { city, temp, wind_speed, humidity, weather } = response.list[0];
      console.log('response.list[0]: ', response.list[0]);
      console.log('city: ', city);
      console.log('temp: ', temp);
      console.log('wind_speed: ', wind_speed);
      console.log('humidity: ', humidity);
      console.log('weather: ', weather);
      const { icon } = weather[0];
      return new Weather(city, temp, wind_speed, humidity, icon);
    } catch (err) {
      console.log('Error: Unable to parseCurrentWeather', err);
      return new Weather('', 0, '', 0, ''); // Return empty Weather object
    }
    
  }

  // TODO: Complete buildForecastArray method
  // this basically adds current weather to the forecast ?
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    //const forecastArray = weather[] [];
    // weatherData.daily.forEach((data: any) => {
    //   const { city, temp, wind_speed, humidity, weather } = data;
    //   const { icon } = weather[0];
      // const date = new Date(weather.dt * 1000).to ISOString();
      // forecastArray.push(new Weather(city, temp, wind_speed, humidity, icon));
      // return forecastArray;
    
    try {
      // const time;
      // grab 1 object from each day 
      //dt_text
      const forecastArray = weatherData.map((data: any) => {
      const { city, temp, wind_speed, humidity, weather } = data;
      const { icon } = weather[0];
      // const date = new Date(weather.dt * 1000).to ISOString();
      return new Weather(city, temp, wind_speed, humidity, icon);
    });
    forecastArray.push(currentWeather);
    return forecastArray;
    } catch (err) {
      console.log('Error: Unable to buildForecastArray', err);
      return [new Weather('', 0, '', 0, '')]; // Return empty Weather object
    }
  }
  // TODO: Complete getWeatherForCity method
  // main method
  async getWeatherForCity(city: string) {
    try {
      this.cityName = city;
      // console.log('cityName: ', this.cityName);
      const queryC = this.buildGeocodeQuery();
      // console.log('queryC: ', queryC);
      const locationData = await this.fetchLocationData(queryC);
      // console.log('locationData: ', locationData);
      const coordinates = this.destructureLocationData(locationData);
      // console.log('coordinates: ', coordinates);
      const queryW = await this.buildWeatherQuery(coordinates);
      console.log('queryW: ', queryW);
      const weatherData = await this.fetchWeatherData(coordinates);
      // console.log('weatherData: ', weatherData);
      const currentWeather = this.parseCurrentWeather(weatherData);
      // console.log('currentWeather: ', currentWeather);
      const forecast = this.buildForecastArray(currentWeather, weatherData.daily);
      // console.log('forecast: ', forecast);
      return forecast;
    }

    // try {//declare parameter as the object to work on
    //   this.cityName = city;
    //   // fetch and format location into coordinates
    //   const coordinates = await this.fetchAndDestructureLocationData();
    //   // get weather @ coordinates
    //   const weatherData = await this.fetchWeatherData(coordinates);
    //   // take the weather data and convert it to a Weather object
    //   const currentWeather = this.parseCurrentWeather(weatherData);
    //   // create forecast
    //   const forecast = this.buildForecastArray(currentWeather, weatherData.daily);
    //   return forecast;
    // } catch (err) {
    //   console.log('Error: Unable to getWeatherForCity', err);
    //   return [new Weather('', 0, '', 0, '')]; // Return empty Weather object
    // }
   catch (err) {
    console.log('Error: Unable to getWeatherForCity', err);
    return [new Weather('', 0, '', 0, '')]; // Return empty Weather object
  }
}
}

export default new WeatherService();
