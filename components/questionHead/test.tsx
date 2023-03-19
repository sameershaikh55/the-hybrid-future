import { render, screen } from "@testing-library/react";
import QuestionHead from "./index";

describe("QuestionHead component", () => {
  it("renders the question number and text", () => {
    const questionNumber = "1";
    const question = "What is the capital of France?";
    render(
      <QuestionHead questionNumber={questionNumber} question={question} />
    );

    const questionNumberElement = screen.getByText(
      `Question ${questionNumber}`
    );
    const questionElement = screen.getByText(question);

    expect(questionNumberElement).toBeInTheDocument();
    expect(questionElement).toBeInTheDocument();
  });
});
