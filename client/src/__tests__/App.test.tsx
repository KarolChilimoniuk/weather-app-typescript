import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "../App";

describe("Main container test", () => {
  test("Render main container", () => {
    const component = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    component
      ? console.debug(component)
      : console.error(`<App/> component can't be rendered.`);
  });
});
