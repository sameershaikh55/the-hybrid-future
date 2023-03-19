import { render } from "@testing-library/react";
import Loader from "./index";

describe("Loader", () => {
  test("renders loading spinner", () => {
    const { getByTestId } = render(<Loader />);
    const spinner = getByTestId("hash-loader");
    expect(spinner).toBeInTheDocument();
  });
});
