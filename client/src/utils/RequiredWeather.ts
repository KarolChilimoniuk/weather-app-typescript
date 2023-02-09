import { getReqCityData } from "../services/api/apiHandling";

export const fetchAppData = async (
  setLoading: Function,
  newCityInfo: Function,
  newForecastInfo: Function,
  cityName: string
): Promise<void> => {
  setLoading(true);
  if (cityName !== "") {
    const weatherData = await getReqCityData(cityName);
    if (!weatherData.message && weatherData !== null) {
      newCityInfo(weatherData.currentWeather);
      newForecastInfo(weatherData.forecastData);
      setLoading(false);
    }
    if (weatherData.message) {
      setLoading(false);
      alert(`${weatherData.message}`);
    }
  }
};
