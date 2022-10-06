import { render, RenderResult } from "@testing-library/react";
import { getLocWeatherData } from "../apiHandling/apiHandling";
import { IUserPosition, IWeatherInfo } from "../services/interfaces/interfaces";
import Home from "../components/Home/Home";
import DailyForecast from "../components/DailyForecast/DailyForecast";

interface IGeolocationData {
  coords: IUserPosition;
}

describe("Home layout tests", () => {
  let homePage: RenderResult;
  let userGeolocationData: IGeolocationData = null;

  beforeAll(() => {
    homePage = render(<Home />);

    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 53.1322562,
              longitude: 23.1609533,
            },
          })
        )
      ),
    };
    // @ts-ignore
    navigator.geolocation = mockGeolocation;

    navigator.geolocation.getCurrentPosition((userCoords) => {
      userGeolocationData = userCoords;

      () => {
        console.error("Can't get geolocation coords :(");
      };
    });

    console.table(userGeolocationData);
  });

  test("Home page loading element rendering", () => {
    const loadingElement: HTMLHeadingElement =
      document.querySelector(".loading");
    expect(loadingElement).toBeInTheDocument();
  });
  test("Render DailyForecast component inside Home page", async () => {
    const localWeatherData: IWeatherInfo = await getLocWeatherData(
      userGeolocationData.coords.latitude,
      userGeolocationData.coords.longitude
    );

    const dailyForecastComponent = render(
      <DailyForecast forecastInfo={localWeatherData.forecastData} />
    );

    dailyForecastComponent && console.debug(dailyForecastComponent);
  });
});
