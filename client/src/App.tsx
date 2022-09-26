import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RequiredWeather from "./components/RequiredWeather/RequiredWeather";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import { IUserPosition } from "./services/interfaces/interfaces";
import "./App.scss";

export const PositionContext = createContext<IUserPosition>(null);

const App = (): JSX.Element => {
  const [userPosition, newUserPosition] = useState<IUserPosition>(null);

  const successCallback = (userPos: any): void => {
    newUserPosition(userPos.coords);
    console.log("I've got your localization data :]");
  };

  const failureCallback = (): void => {
    newUserPosition(null);
    console.log("I can't get your localization data :(");
  };

  useEffect((): void => {
    if ("geolocation" in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        successCallback,
        failureCallback
      );
    } else {
      alert("Geolocation is not available");
    }
  }, []);

  return (
    <PositionContext.Provider value={userPosition}>
      <div className="App">
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
