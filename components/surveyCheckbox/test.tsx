import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./index";

describe("Checkbox", () => {
  const handleChange = jest.fn();
  const option = {
    option_id: 1,
    option_label: "Option 1",
    position: 1,
    optional: false,
  };

  test("Checkbox component renders correctly", () => {
    const { container } = render(
      <Checkbox
        value={false}
        handleChange={jest.fn()}
        i={0}
        questions={1}
        option={option}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("calls handleChange on checkbox click", () => {
    render(
      <Checkbox
        value={false}
        handleChange={handleChange}
        i={0}
        questions={2}
        option={option}
      />
    );

    const checkbox = screen.getByLabelText(/option 1/i);
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(option);
  });
});
