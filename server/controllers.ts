import {Request, Response} from 'Express';
import {getCurrentLocWeather, getForecastLocWeather, getReqWeather, getReqForecast} from './weatherFetch';

export const getLocWeatherData = async (req:Request, res:Response) => {
   const {lat, lon} = req.body;
   const currentWeather = await getCurrentLocWeather(lat, lon);
   const weatherForecast = await getForecastLocWeather(lat, lon);
   res.status(200).send({currentWeather: currentWeather, forecastData: weatherForecast});
}

export const getRequiredWeatherData = async (req:Request, res:Response) => {
   const {cityName} = req.body;
   const currentWeather = await getReqWeather(cityName);
   if(currentWeather) {
      const weatherForecast = await getReqForecast(currentWeather.coord.lat, currentWeather.coord.lon);
      res.status(200).send({currentWeather: currentWeather, forecastData: weatherForecast});
   } else {
      res.status(400).send({message: "Wrong city name. Try again."});
   }
}





