import React from "react";
import { render } from "@testing-library/react";
import SliderPercentage from "./index";

describe("SliderPercentage component", () => {
  it("should display the percentage passed as prop", () => {
    const { getByText } = render(
      <SliderPercentage questions={3} i={0} percentage="50%" />
    );
    const percentageElement = getByText("50%");
    expect(percentageElement).toBeInTheDocument();
  });

  it("should display top line only for the first question", () => {
    const { getByTestId } = render(
      <SliderPercentage questions={3} i={0} percentage="50%" />
    );
    const topLineElement = getByTestId("top-line");
    expect(topLineElement).toBeInTheDocument();
  });

  it("should display bottom line for all questions except the last one", () => {
    const { getByTestId } = render(
      <SliderPercentage questions={3} i={1} percentage="50%" />
    );
    const bottomLineElement = getByTestId("bottom-line");
    expect(bottomLineElement).toBeInTheDocument();
  });

  it("should display different bottom line for the last question", () => {
    const { getByTestId } = render(
      <SliderPercentage questions={3} i={2} percentage="50%" />
    );
    const bottomLineDElement = getByTestId("bottom-line-d");
    expect(bottomLineDElement).toBeInTheDocument();
  });
});
