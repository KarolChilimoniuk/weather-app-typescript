import {
  render,
  fireEvent,
  screen,
  RenderResult,
} from "@testing-library/react";
import Home from "../components/Home/Home";
import RequiredWeather from "../components/RequiredWeather/RequiredWeather";
import DailyForecast from "../components/DailyForecast/DailyForecast";

describe("Home layout tests", () => {
  let homePage: RenderResult;
  let userGeolocation: any = null;
  beforeEach(() => {
    homePage = render(<Home />);
  });
  test("Home page loading element rendering", () => {
    const loadingElement: HTMLHeadingElement =
      document.querySelector(".loading");
    expect(loadingElement).toBeInTheDocument();
  });
  // test("Render DailyForecast component inside Home page", async () => {
  //   const dailyForecastComponent = render(<DailyForecast />);
  //   dailyForecastComponent && console.debug(dailyForecastComponent);
  // });
});
