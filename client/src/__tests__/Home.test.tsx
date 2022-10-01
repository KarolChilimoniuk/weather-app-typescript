import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../components/Home/Home";
import RequiredWeather from "../components/RequiredWeather/RequiredWeather";

describe("Home layout tests", () => {
  test("Rendering", async () => {
    const component = render(<RequiredWeather />);
    expect(component).component && console.debug(component);
  });
});
