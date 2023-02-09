import { getLocWeatherData } from "../services/api/apiHandling";
import { IUserPosition } from "../interfaces/interfaces";

export const fetchAppData = async (
  userPosition: IUserPosition | boolean,
  newUserPositionWeather: Function,
  newForecastInfo: Function,
  setLoading: Function
): Promise<void> => {
  if (typeof userPosition !== "boolean") {
    const localWeatherData = await getLocWeatherData(
      userPosition.latitude,
      userPosition.longitude
    );
    if (localWeatherData !== null) {
      newUserPositionWeather(localWeatherData.currentWeather);
      newForecastInfo(localWeatherData.forecastData);
      setLoading(false);
    }
  }
};
