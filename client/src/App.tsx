import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RequiredWeather from "./components/RequiredWeather/RequiredWeather";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import "./App.scss";

export type UserPosition = {
  latitude: string;
  longitude: string;
}

export const PositionContext = createContext<UserPosition | number>(0);

const App = (): JSX.Element => {
  const [userPosition, newUserPosition] = useState<UserPosition | number>(0);

  const successCallback = (userPos:any) => {
    newUserPosition(userPos.coords);
    console.log("I've got your localization data :]");
  };

  const failureCallback = () => {
    newUserPosition(0);
    console.log("I can't get your localization data :(");
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      failureCallback
    );
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
