import { Router } from 'express';
// import weatherService from '../../service/weatherService';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
    // const weatherService = new WeatherService();
  try {
    // console.log('id: ', req.body);
    const newCity = req.body.cityName;
    console.log('newCity', JSON.stringify(newCity));
    const weatherData = await WeatherService.getWeatherForCity(newCity);
    console.log('weatherData: ', weatherData);
    res.json(weatherData);

  // TODO: save city to search history
    const id = weatherData[0].id;
    console.log('id: ', id);
    HistoryService.addCity(newCity, id);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    // const newCity = req.body.cityName;
    // const weatherData = await WeatherService.getWeatherForCity(newCity);
    const id = req.params.id;
    await HistoryService.removeCity(id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
