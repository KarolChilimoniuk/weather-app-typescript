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
  let userGeolocationData: any = null;

  beforeEach(() => {
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
        console.log("Can't get user coords :(");
      };
    });
    console.log(userGeolocationData.coords);
  });

  test("Home page loading element rendering", () => {
    const loadingElement: HTMLHeadingElement =
      document.querySelector(".loading");

    console.debug(loadingElement);

    expect(loadingElement).toBeInTheDocument();
  });
  // test("Render DailyForecast component inside Home page", async () => {
  //   const dailyForecastComponent = render(<DailyForecast />);
  //   dailyForecastComponent && console.debug(dailyForecastComponent);
  // });
});
