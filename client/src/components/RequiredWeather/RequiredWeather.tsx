import { useState, useEffect } from "react";
import moment from "moment";
import { INextWeekForecast } from "../../services/interfaces/interfaces";
import Form from "../Form/Form";
import DailyForecast from "../DailyForecast/DailyForecast";
import { getReqCityData } from "../../apiHandling/apiHandling";
import { Helmet } from "react-helmet-async";
import styles from "./RequiredWeather.module.scss";

const RequiredWeather = (): JSX.Element => {
  const [cityName, newCityName] = useState<string>("");
  const [cityInfo, newCityInfo] = useState<any>("");
  const [forecastInfo, newForecastInfo] = useState<INextWeekForecast>(null);

  const fetchAppData = async (): Promise<void> => {
    if (cityName !== "") {
      const weatherData = await getReqCityData(cityName);
      if (!weatherData.message && weatherData !== null) {
        newCityInfo(weatherData.currentWeather);
        newForecastInfo(weatherData.forecastData);
      } else {
        alert(`${weatherData.message}`);
      }
    }
  };

  useEffect((): void => {
    if (cityName !== "") {
      fetchAppData();
    }
  }, [cityName]);

  return (
    <>
      <Helmet>
        <title>Weather app by Karol Chilimoniuk</title>
        <meta
          name="description"
          content="Weather app coded by Karol Chilimoniuk with React and other technologies"
        />
        <link rel="canonical" href="/requiredForecast" />
      </Helmet>
      <section className={styles.forecastContainer}>
        <Form appMethod={newCityName} cityName={cityName} />
        {cityInfo === "" && <p className={styles.error}>Write a city</p>}
        {cityInfo.cod !== 200 ? (
          <p className={styles.error}>{cityInfo.message}</p>
        ) : null}
        {cityInfo.cod === 200 ? (
          <>
            <div className={styles.currentWeatherContainer}>
              <h2 className={styles.header}>Current weather</h2>
              <div className={styles.todayWeather}>
                <h3 className={styles.paragraph}>{cityInfo.name}</h3>
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
                  src={`http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`}
                />
                <p className={styles.paragraph}>
                  Weather:{" "}
                  <span className={styles.span}>
                    {cityInfo.weather[0].description}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunrise:{" "}
                  <span className={styles.span}>
                    {moment(cityInfo.sys.sunrise * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunset:{" "}
                  <span className={styles.span}>
                    {moment(cityInfo.sys.sunset * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Temperature:{" "}
                  <span className={styles.span}>{cityInfo.main.temp} °C</span>
                </p>
                <p className={styles.paragraph}>
                  Feels like:{" "}
                  <span className={styles.span}>
                    {cityInfo.main.feels_like} °C
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Pressure:{" "}
                  <span className={styles.span}>
                    {cityInfo.main.pressure} hPa
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Humidity:{" "}
                  <span className={styles.span}>
                    {cityInfo.main.humidity} %
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Wind speed:{" "}
                  <span className={styles.span}>
                    {cityInfo.wind.speed} km/h
                  </span>
                </p>
              </div>
            </div>
            {forecastInfo !== null && (
              <DailyForecast forecastInfo={forecastInfo} />
            )}
          </>
        ) : null}
      </section>
    </>
  );
};

export default RequiredWeather;
