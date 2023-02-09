import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { PositionContext } from "../../App";
import DailyForecast from "../DailyForecast/DailyForecast";
import {
  IUserPosition,
  ICurrentWeather,
  IForecast,
} from "../../interfaces/interfaces";
import { fetchAppData } from "../../utils/Home";
import styles from "./Home.module.scss";

const Home = (): JSX.Element => {
  const userPosition: IUserPosition | boolean = useContext(PositionContext);
  const [userPositionWeather, newUserPositionWeather] =
    useState<ICurrentWeather>(null);
  const [forecastInfo, newForecastInfo] = useState<IForecast>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect((): void => {
    if (userPosition !== null) {
      fetchAppData(
        userPosition,
        newUserPositionWeather,
        newForecastInfo,
        setLoading
      );
    }
    typeof userPosition === "boolean" && setLoading(false);
  }, [userPosition]);

  return (
    <>
      <section className={styles.container}>
        {isLoading && <h3 className={styles.loading}>... Loading</h3>}
        {!isLoading && typeof userPosition === "boolean" && (
          <h3 className={styles.errorHeader}>
            I need your permission to get your geolocation data. It is needed to
            fetch your local weather forecast.
          </h3>
        )}
        {!isLoading && typeof userPosition !== "boolean" && (
          <>
            <div className={styles.currentWeather}>
              <h2 className={styles.header}>Your localization</h2>
              <div className={styles.weatherDetails}>
                <p className={styles.paragraph}>
                  You are in{" "}
                  <span className={styles.span}>
                    {userPositionWeather.name}
                  </span>
                  ,{" "}
                  <span className={styles.span}>
                    {userPositionWeather.sys.country}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Day:{" "}
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
                  Current weather is:{" "}
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
