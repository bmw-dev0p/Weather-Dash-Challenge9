import { Router } from 'express';
// import weatherService from '../../service/weatherService';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  res.json(weatherData);
  
  // TODO: save city to search history
  
});

// TODO: GET search history
// router.get('/history', async (req, res) => {
//   weatherService.getWeatherForCity(req.body.city).then((data) => {
//     res.json(data);
//   });
// });


// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
