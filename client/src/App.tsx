import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RequiredWeather from "./components/RequiredWeather/RequiredWeather";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import { IUserPosition } from "./interfaces/interfaces";
import "./App.scss";

export const PositionContext = createContext<IUserPosition | boolean>(null);

const App = (): JSX.Element => {
  const [userPosition, newUserPosition] = useState<IUserPosition | boolean>(
    null
  );

  const successCallback = (userPos: any): void => {
    newUserPosition(userPos.coords);
    console.info("I've got your localization data :]");
  };

  const failureCallback = (): void => {
    newUserPosition(false);
    console.info("Geolocation is not available");
  };

  useEffect((): void => {
    if ("geolocation" in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        successCallback,
        failureCallback
      );
    }
  }, []);

  return (
    <PositionContext.Provider value={userPosition}>
      <div className="App">
        <div className="background"></div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requiredForecast" element={<RequiredWeather />} />
        </Routes>
        <Footer />
      </div>
    </PositionContext.Provider>
  );
};

export default App;
