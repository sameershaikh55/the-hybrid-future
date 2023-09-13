import { render } from "@testing-library/react";
import SurveyActions from "./index";

describe("SurveyActions component", () => {
  test("renders back button with correct href", () => {
    const backURL = "/survey/page1";
    const { getByText } = render(
      <SurveyActions backURL={backURL} nextURL="/survey/page3" active chosenData={undefined} />
    );
    const backButton = getByText("Back");

    expect(backButton.getAttribute("href")).toBe(backURL);
  });

  test("renders active next button with correct href", () => {
    const nextURL = "/survey/page3";
    const { getByText } = render(
      <SurveyActions backURL="/survey/page2" nextURL={nextURL} active chosenData={undefined} />
    );
    const nextButton = getByText("Next");

    expect(nextButton.getAttribute("href")).toBe(nextURL);
    expect(nextButton).not.toBeDisabled();
  });

  test("renders disabled next button when not active", () => {
    const { getByText } = render(
      <SurveyActions
        backURL="/survey/page2"
        nextURL="/survey/page3"
        active={false} chosenData={undefined}      />
    );
    const nextButton = getByText("Next");

    expect(nextButton).toBeDisabled();
  });
});
