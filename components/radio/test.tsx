import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Radio from "./index";
import { Props } from "./types";

describe("Radio component", () => {
  const props: Props = {
    i: 0,
    questions: 3,
    onChange: jest.fn(),
    active: false,
    option: {
      option_id: 1,
      option_label: "Option 1",
      position: 1,
      optional: false,
    },
  };

  it("renders the radio button with the correct checked prop", () => {
    const { getByRole } = render(<Radio {...props} />);
    const radioButton = getByRole("radio") as HTMLInputElement;
    expect(radioButton.checked).toBe(props.active);

    fireEvent.click(radioButton);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({
      selectedOption: props.option,
    });
  });
});
