import React from "react";
import { render } from "@testing-library/react";
import SurveyQuestion from "./index";

describe("SurveyQuestion component", () => {
  test("renders question text", () => {
    const questionText = "What is your favorite color?";
    const { getByText } = render(
      <SurveyQuestion i={0} questions={1} question={questionText} />
    );
    const questionElement = getByText(questionText);
    expect(questionElement).toBeInTheDocument();
  });

  test("renders top line if it's the first question", () => {
    const { getByTestId } = render(
      <SurveyQuestion i={0} questions={2} question="Question 1" />
    );
    const topLineElement = getByTestId("top-line");
    expect(topLineElement).toBeInTheDocument();
  });

  test("renders bottom line if it's not the last question", () => {
    const { getByTestId } = render(
      <SurveyQuestion i={0} questions={2} question="Question 1" />
    );
    const bottomLineElement = getByTestId("bottom-line");
    expect(bottomLineElement).toBeInTheDocument();
  });

  test("renders different bottom line if it's the last question", () => {
    const { getByTestId } = render(
      <SurveyQuestion i={1} questions={2} question="Question 2" />
    );
    const bottomLineDElement = getByTestId("bottom-line-d");
    expect(bottomLineDElement).toBeInTheDocument();
  });
});
