import { useState, useEffect } from "react";
import moment from "moment";
import { INextWeekForecast } from "../../interfaces/interfaces";
import { DailyForecastProps } from "../../types/types";
import styles from "./DailyForecast.module.scss";

const DailyForecast = ({ forecastInfo }: DailyForecastProps): JSX.Element => {
  const [nextWeek, setNextWeek] = useState<INextWeekForecast>(null);

  useEffect((): void => {
    const next7Days = forecastInfo.daily.filter((day) =>
      moment(day.dt * 1000).format("MMMM Do YYYY") !==
      moment().format("MMMM Do YYYY")
        ? day
        : null
    );
    setNextWeek({ nextWeekForecast: next7Days });
  }, [forecastInfo]);

  return (
    <section className={styles.dailyForecast__container}>
      <h2 className={styles.dailyForecast__header}>Next 7 days forecast</h2>
      <div className={styles.dailyForecast__weekDailyForecast}>
        {forecastInfo !== undefined &&
        forecastInfo !== null &&
        nextWeek !== null
          ? nextWeek.nextWeekForecast.map((el, i, arr) => (
              <div className={styles.weekDailyForecast__dayForecast} key={i}>
                <h3 className={styles.weekDailyForecast__secondHeader}>
                  {moment(el.dt * 1000).format("dddd")},
                </h3>
                <h3 className={styles.weekDailyForecast__secondHeader}>
                  {moment(el.dt * 1000).format("MMMM Do YYYY")}
                </h3>
                <img
                  className={styles.weekDailyForecast__icon}
                  src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                  alt={`weather icon`}
                />
                <p className={styles.dailyForecast__paragraph}>
                  Weather:{" "}
                  <span className={styles.span}>
                    {el.weather[0].description}
                  </span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Sunrise:{" "}
                  <span className={styles.span}>
                    {moment(el.sunrise * 1000).format("LT")}
                  </span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Sunset:{" "}
                  <span className={styles.span}>
                    {moment(el.sunset * 1000).format("LT")}
                  </span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Temperature:{" "}
                  <span className={styles.span}>{el.temp.day} °C</span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Feels like:{" "}
                  <span className={styles.span}>{el.feels_like.day} °C</span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Pressure:{" "}
                  <span className={styles.span}>{el.pressure} hPa </span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
                  Humidity:{" "}
                  <span className={styles.span}>{el.humidity} % </span>
                </p>
                <p className={styles.dailyForecast__paragraph}>
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
