import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("Header", () => {
  test("renders logo", () => {
    render(<Header title="Test Title" />);

    // Check that the logo image is rendered
    const logo = screen.getByAltText("");
    expect(logo).toBeInTheDocument();
  });

  test("renders back button for profile setup verification", () => {
    // Mock the useRouter hook to return a pathname with the '/survey/profile_setup/' string
    jest.mock("next/router", () => ({
      useRouter: () => ({
        pathname: "/survey/profile_setup/verification",
      }),
    }));

    render(<Header title="Test Title" />);

    // Check that the back button image is rendered
    const backButton = screen.getByAltText("");
    expect(backButton).toBeInTheDocument();
  });

  test("does not render back button for non-profile setup verification", () => {
    // Mock the useRouter hook to return a pathname without the '/survey/profile_setup/' string
    jest.mock("next/router", () => ({
      useRouter: () => ({
        pathname: "/verification",
      }),
    }));

    render(<Header title="Test Title" />);

    // Check that the back button image is not rendered
    const backButton = screen.queryByAltText("");
    expect(backButton).toBeNull();
  });
});
