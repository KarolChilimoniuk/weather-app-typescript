import { useState, useEffect } from "react";
import moment from "moment";
import { INextWeekForecast } from "../../services/interfaces/interfaces";
import styles from "./DailyForecast.module.scss";

const DailyForecast = ({ forecastInfo }: any): JSX.Element => {
  const [nextWeek, setNextWeek] = useState<INextWeekForecast>(null);

  useEffect((): void => {
    console.log(forecastInfo.daily);
    const next7Days = forecastInfo.daily.filter((day) =>
      moment(day.dt * 1000).format("MMMM Do YYYY") !==
      moment().format("MMM Do YYYY")
        ? day
        : null
    );
    setNextWeek(next7Days);
  }, [forecastInfo]);

  return (
    <section className={styles.dailyForecastContainer}>
      <h2 className={styles.header}>8 days forecast</h2>
      <div className={styles.weekDailyForecast}>
        {forecastInfo !== undefined &&
        forecastInfo !== null &&
        nextWeek !== null
          ? nextWeek.map((el, i, arr) => (
              <div className={styles.dayForecast}>
                <h3 className={styles.secondHeader}>
                  {moment(el.dt * 1000).format("dddd")}
                  {", "}
                  {moment(el.dt * 1000).format("MMMM Do YYYY")}
                </h3>
                <img
                  className={styles.icon}
                  src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                />
                <p className={styles.paragraph}>
                  Weather:{" "}
                  <span className={styles.span}>
                    {el.weather[0].description}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunrise:{" "}
                  <span className={styles.span}>
                    {moment(el.sunrise * 1000).format("LT")}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Sunset:{" "}
                  <span className={styles.span}>
                    {moment(el.sunset * 1000).format("LT")}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Temperature:{" "}
                  <span className={styles.span}>{el.temp.day} °C</span>
                </p>
                <p className={styles.paragraph}>
                  Feels like:{" "}
                  <span className={styles.span}>{el.feels_like.day} °C</span>
                </p>
                <p className={styles.paragraph}>
                  Pressure:{" "}
                  <span className={styles.span}>{el.pressure} hPa </span>
                </p>
                <p className={styles.paragraph}>
                  Humidity:{" "}
                  <span className={styles.span}>{el.humidity} % </span>
                </p>
                <p className={styles.paragraph}>
                  Wind speed:{" "}
                  <span className={styles.span}>{el.wind_speed} km/h</span>
                </p>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default DailyForecast;
