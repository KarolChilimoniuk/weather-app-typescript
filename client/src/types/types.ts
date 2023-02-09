import { IForecast } from "../interfaces/interfaces";

export type BurgerProps = {
  mobileHandler: Function;
};

export type DailyForecastProps = {
  forecastInfo: IForecast;
};

export type FormProps = {
  appMethod: Function;
  cityName: string;
};
