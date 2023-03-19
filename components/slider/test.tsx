import { render, fireEvent } from "@testing-library/react";
import Slider from "./index";

describe("Slider component", () => {
  const onChange = jest.fn();

  test("renders with default props", () => {
    const { getByAltText } = render(
      <Slider
        heading="Test Heading"
        questions={2}
        percentage={50}
        i={1}
        onChange={onChange}
      />
    );

    expect(getByAltText("Left arrow")).toBeTruthy();
    expect(getByAltText("Right arrow")).toBeTruthy();
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test("decreases the percentage when left arrow is clicked", () => {
    const { getByAltText } = render(
      <Slider
        heading="Test Heading"
        questions={2}
        percentage={50}
        i={1}
        onChange={onChange}
      />
    );

    fireEvent.click(getByAltText("Left arrow"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      heading: "Test Heading",
      percentage: 40,
    });
  });

  test("increases the percentage when right arrow is clicked", () => {
    const { getByAltText } = render(
      <Slider
        heading="Test Heading"
        questions={2}
        percentage={50}
        i={1}
        onChange={onChange}
      />
    );

    fireEvent.click(getByAltText("Right arrow"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      heading: "Test Heading",
      percentage: 60,
    });
  });
});
