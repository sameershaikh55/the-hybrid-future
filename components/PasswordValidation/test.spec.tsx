import { render } from "@testing-library/react";
import PasswordValidation from "./index";

describe("PasswordValidation", () => {
  test("renders password validation requirements", () => {
    const passValidation = [1, 3, 4];
    const { getByText, getAllByAltText } = render(
      <PasswordValidation passValidation={passValidation} />
    );

    expect(getByText("At least 8 characters")).toBeInTheDocument();
    expect(getByText("A number")).toBeInTheDocument();
    expect(getByText("An uppercase letter")).toBeInTheDocument();
    expect(getByText("A lowercase letter")).toBeInTheDocument();
    expect(getByText("A symbol")).toBeInTheDocument();

    const invalidIcons = getAllByAltText(
      "Validation icon for invalid requirement"
    );
    const validIcons = getAllByAltText("Validation icon for valid requirement");

    expect(invalidIcons.length).toBe(2);
    expect(validIcons.length).toBe(3);

    invalidIcons.forEach((icon) =>
      expect(icon).toHaveAttribute("src", "/assets/valcross.svg")
    );
    validIcons.forEach((icon) =>
      expect(icon).toHaveAttribute("src", "/assets/valcorrect.svg")
    );
  });
});
