import { useState, useEffect } from "react";
import moment from "moment";
import { IForecast } from "../../interfaces/interfaces";
import Form from "../Form/Form";
import DailyForecast from "../DailyForecast/DailyForecast";
import { fetchAppData } from "../../utils/RequiredWeather";
import styles from "./RequiredWeather.module.scss";

const RequiredWeather = (): JSX.Element => {
  const [cityName, newCityName] = useState<string>("");
  const [cityInfo, newCityInfo] = useState<any>("");
  const [forecastInfo, newForecastInfo] = useState<IForecast>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect((): void => {
    if (cityName !== "") {
      fetchAppData(setLoading, newCityInfo, newForecastInfo, cityName);
    }
  }, [cityName]);

  return (
    <>
      <section className={styles.forecast__container}>
        <Form appMethod={newCityName} cityName={cityName} />
        {cityInfo === "" && isLoading === false && (
          <p className={styles.forecast__error} data-testid="writeACityTest">
            Write a city
          </p>
        )}
        {isLoading === true && (
          <h3 className={styles.forecast__loading}>... Loading</h3>
        )}
        {cityInfo.cod !== 200 && isLoading === false ? (
          <p className={styles.forecast__error}>{cityInfo.message}</p>
        ) : null}
        {cityInfo.cod === 200 && isLoading === false ? (
          <>
            <div className={styles.forecast__currentWeather_container}>
              <h2 className={styles.currentWeather__header}>Current weather</h2>
              <div className={styles.currentWeather__todayWeather}>
                <h3 className={styles.currentWeather__paragraph}>
                  {cityInfo.name}
                  <span>, </span>
                  {cityInfo.sys.country}
                </h3>
                <p className={styles.currentWeather__paragraph}>
                  <span className={styles.currentWeather__span}>
                    {moment().format("dddd")}
                    {", "}
                    {moment().format("MMMM Do YYYY")}
                  </span>
                </p>
                <img
                  className={styles.currentWeather__icon}
                  src={`http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`}
                  alt={`weather icon`}
                />
                <p className={styles.currentWeather__paragraph}>
                  Weather:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.weather[0].description}
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Sunrise:{" "}
                  <span className={styles.currentWeather__span}>
                    {moment(cityInfo.sys.sunrise * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Sunset:{" "}
                  <span className={styles.currentWeather__span}>
                    {moment(cityInfo.sys.sunset * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Temperature:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.main.temp} °C
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Feels like:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.main.feels_like} °C
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Pressure:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.main.pressure} hPa
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Humidity:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.main.humidity} %
                  </span>
                </p>
                <p className={styles.currentWeather__paragraph}>
                  Wind speed:{" "}
                  <span className={styles.currentWeather__span}>
                    {cityInfo.wind.speed} km/h
                  </span>
                </p>
              </div>
            </div>
            {forecastInfo !== null && isLoading === false && (
              <DailyForecast forecastInfo={forecastInfo} />
            )}
          </>
        ) : null}
      </section>
    </>
  );
};

export default RequiredWeather;
