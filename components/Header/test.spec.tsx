import { render, screen } from "@testing-library/react";
import Header from "./index";

jest.mock("next/router");

describe("Header", () => {
  test("renders logo", () => {
    render(<Header title={""} />);

    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test("renders back button for profile setup verification", () => {
    require("next/router").useRouter.mockReturnValue({
      pathname: "/survey/profile_setup/verification",
    });

    render(<Header title={""} />);

    const backButton = screen.getByRole("img", { name: /back button/i });
    expect(backButton).toBeInTheDocument();
  });

  test("does not render back button for non-profile setup verification", () => {
    require("next/router").useRouter.mockReturnValue({
      pathname: "/verification",
    });

    render(<Header title={""} />);

    const backButton = screen.queryByRole("img", { name: /back button/i });
    expect(backButton).toBeNull();
  });
});
