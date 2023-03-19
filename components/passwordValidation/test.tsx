import { render } from "@testing-library/react";
import PasswordValidation from "./index";

describe("PasswordValidation", () => {
  test("renders password validation requirements", () => {
    const passValidation = [1, 3, 4];
    const { getByText, getByAltText } = render(
      <PasswordValidation passValidation={passValidation} />
    );

    expect(getByText("At least 8 characters")).toBeInTheDocument();
    expect(getByText("A number")).toBeInTheDocument();
    expect(getByText("An uppercase letter")).toBeInTheDocument();
    expect(getByText("A lowercase letter")).toBeInTheDocument();
    expect(getByText("A symbol")).toBeInTheDocument();

    expect(
      getByAltText("validation icon for invalid requirement")
    ).toBeInTheDocument();
    expect(
      getByAltText("validation icon for valid requirement")
    ).toBeInTheDocument();

    expect(
      getByAltText("validation icon for invalid requirement")
    ).toHaveAttribute("src", "/assets/valcross.svg");
    expect(
      getByAltText("validation icon for valid requirement")
    ).toHaveAttribute("src", "/assets/valcorrect.svg");
  });
});
