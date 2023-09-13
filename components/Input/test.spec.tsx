import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./index";

describe("Input component", () => {
  test("renders input field with placeholder", () => {
    render(
      <Input label="Email" value="" name="email" onChange={() => {}} error="" />
    );
    const inputElement = screen.getByPlaceholderText("Email");
    expect(inputElement).toBeInTheDocument();
  });

  test("shows password when icon is clicked", () => {
    render(
      <Input
        label="Password"
        value=""
        name="password"
        onChange={() => {}}
        error=""
      />
    );
    const inputElement = screen.getByPlaceholderText("Password");
    const iconElement = screen.getByAltText("password-toggle-icon");
    expect(inputElement).toHaveAttribute("type", "password");
    userEvent.click(iconElement);
    expect(inputElement).toHaveAttribute("type", "text");
    userEvent.click(iconElement);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("shows error message when there is an error", () => {
    render(
      <Input
        label="Email"
        value=""
        name="email"
        onChange={() => {}}
        error="Invalid email"
      />
    );
    const errorMessage = screen.getByText("*Invalid email");
    expect(errorMessage).toBeInTheDocument();
  });
});
