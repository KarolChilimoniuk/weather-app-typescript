import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PositionContext } from "../../App";
import DailyForecast from "../DailyForecast/DailyForecast";
import {
  IUserPosition,
  ICurrentWeather,
  IForecast,
} from "../../services/interfaces/interfaces";
import { getLocWeatherData } from "../../apiHandling/apiHandling";
import styles from "./Home.module.scss";

const Home = (): JSX.Element => {
  const userPosition: number | IUserPosition = useContext(PositionContext);
  const [userPositionWeather, newUserPositionWeather] =
    useState<ICurrentWeather>(null);
  const [forecastInfo, newForecastInfo] = useState<IForecast>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchAppData = async (): Promise<void> => {
    if (userPosition !== null) {
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

  useEffect((): void => {
    if (userPosition !== null) {
      fetchAppData();
    }
  }, [userPosition]);

  return (
    <>
      <section className={styles.container}>
        {isLoading && <h3 className={styles.loading}>... Loading</h3>}
        {isLoading === false && (
          <>
            <div className={styles.currentWeather}>
              <h2 className={styles.header}>Your localization</h2>
              <div className={styles.weatherDetails}>
                <p className={styles.paragraph}>
                  <span className={styles.span}>
                    {userPositionWeather.name}
                  </span>
                  <span className={styles.span}>{", "}</span>
                  <span className={styles.span}>
                    {userPositionWeather.sys.country}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  <span className={styles.span}>
                    {moment().format("dddd")}
                    {", "}
                    {moment().format("MMMM Do YYYY")}
                  </span>
                </p>
                <img
                  className={styles.icon}
                  src={`http://openweathermap.org/img/wn/${userPositionWeather.weather[0].icon}@2x.png`}
                  alt={`weather icon`}
                />
                <p className={styles.paragraph}>
                  Weather is:{" "}
                  <span className={styles.span}>
                    {userPositionWeather.weather[0].description}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunrise:{" "}
                  <span className={styles.span}>
                    {moment(userPositionWeather.sys.sunrise * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunset:{" "}
                  <span className={styles.span}>
                    {moment(userPositionWeather.sys.sunset * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Temperature:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.temp} °C
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Feels like:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.feels_like} °C
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Pressure:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.pressure} hPa
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Humidity:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.humidity} %
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Wind speed:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.wind.speed} km/h
                  </span>
                </p>
              </div>
            </div>
            {forecastInfo !== null && (
              <DailyForecast forecastInfo={forecastInfo} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
