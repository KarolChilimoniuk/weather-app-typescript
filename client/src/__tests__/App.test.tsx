import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Main container test", () => {
  test("Render main container", () => {
    const component = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
