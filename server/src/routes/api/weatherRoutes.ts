import { Router } from 'express';
// import weatherService from '../../service/weatherService';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
    // const weatherService = new WeatherService();
  try {
    const newCity = req.body.cityName;
    console.log(JSON.stringify(newCity));
    const weatherData = await WeatherService.getWeatherForCity(newCity);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // TODO: save city to search history
  // HistoryService.addCity(req.body.city, req.body.id);
  
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
