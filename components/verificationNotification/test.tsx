import React from "react";
import { render } from "@testing-library/react";
import VerificationNotification from "./index";

describe("VerificationNotification", () => {
  test("renders notification message", () => {
    const { getByText } = render(<VerificationNotification />);
    const messageElement = getByText(
      /Please click on the verification link sent to your email to finish setting up your account/i
    );
    expect(messageElement).toBeInTheDocument();
  });

  test("renders image", () => {
    const { getByAltText } = render(<VerificationNotification />);
    const imageElement = getByAltText(/bell/i);
    expect(imageElement).toBeInTheDocument();
  });
});
