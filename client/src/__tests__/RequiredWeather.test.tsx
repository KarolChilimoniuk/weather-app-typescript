import { render, RenderResult, screen } from "@testing-library/react";
import RequiredWeather from "../components/RequiredWeather/RequiredWeather";

describe("Required weather page tests", () => {
  let renderResult: RenderResult = null;
  beforeAll(() => {
    renderResult = render(<RequiredWeather />);
  });
  test("`Write a city` section & form rendering", () => {
    const formElement: HTMLFormElement = document.querySelector(".form");
    const writeACityElement: HTMLParagraphElement =
      document.querySelector(".error");
    writeACityElement && console.debug(writeACityElement);
    expect(formElement).toBeInTheDocument();
  });
});
