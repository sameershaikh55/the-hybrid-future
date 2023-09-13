import { render, fireEvent } from "@testing-library/react";
import Checkbox from "./index";

describe("Checkbox component", () => {
  const handleChange = jest.fn();

  afterEach(() => {
    handleChange.mockClear();
  });

  test("renders label text", () => {
    const { getByText } = render(
      <Checkbox label="Test Label" value={false} handleChange={handleChange} />
    );
    expect(getByText("Test Label")).toBeInTheDocument();
  });

  test("calls handleChange when checkbox is clicked", () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Label" value={false} handleChange={handleChange} />
    );
    const checkbox = getByLabelText("Test Label");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renders checked checkbox when value is true", () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Label" value={true} handleChange={handleChange} />
    );
    const checkbox = getByLabelText("Test Label");
    expect(checkbox).toBeChecked();
  });
});
