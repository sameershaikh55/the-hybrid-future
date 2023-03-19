import { render, fireEvent } from "@testing-library/react";
import QuestionOptions from "./index";

describe("QuestionOptions", () => {
  const options = [
    { option_id: 1, option_label: "Option 1", optional: false, position: 1 },
    { option_id: 2, option_label: "Option 2", optional: false, position: 2 },
    { option_id: 3, option_label: "Option 3", optional: false, position: 3 },
  ];

  const handleChange = jest.fn();

  const defaultProps = {
    options,
    onChange: handleChange,
    questions: 3,
    i: 0,
    heading: "Heading 1",
    values: [],
  };

  it("renders the component", () => {
    const { getByText } = render(<QuestionOptions {...defaultProps} />);
    expect(getByText("Please select...")).toBeInTheDocument();
  });

  it("opens the options when clicked", () => {
    const { getByText } = render(<QuestionOptions {...defaultProps} />);
    fireEvent.click(getByText("Please select..."));
    expect(getByText("Option 1")).toBeInTheDocument();
  });

  it("selects an option when clicked", () => {
    const { getByText } = render(<QuestionOptions {...defaultProps} />);
    fireEvent.click(getByText("Please select..."));
    fireEvent.click(getByText("Option 1"));
    expect(handleChange).toHaveBeenCalledWith({
      heading: "Heading 1",
      selectedOption: options[0],
    });
  });
});
