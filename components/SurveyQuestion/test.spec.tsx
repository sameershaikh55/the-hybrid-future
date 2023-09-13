import { render } from "@testing-library/react";
import SurveyQuestion from "./index";

describe("SurveyQuestion", () => {
  it("should render the question", () => {
    const props = {
      i: 0,
      questions: 1,
      question: "What is your favorite color?",
    };
    const { getByText } = render(<SurveyQuestion {...props} />);
    const question = getByText(props.question);
    expect(question).toBeInTheDocument();
  });

  it("should render the top line for the first question", () => {
    const props = {
      i: 0,
      questions: 1,
      question: "What is your favorite color?",
    };
    const { getByTestId } = render(<SurveyQuestion {...props} />);
    const topLine = getByTestId("top-line");
    expect(topLine).toBeInTheDocument();
  });

  it("should render the bottom line for questions other than the last one", () => {
    const props = {
      i: 0,
      questions: 2,
      question: "What is your favorite color?",
    };
    const { getByTestId } = render(<SurveyQuestion {...props} />);
    const bottomLine = getByTestId("bottom-line");
    expect(bottomLine).toBeInTheDocument();
  });

  it("should render the different bottom line for the last question", () => {
    const props = {
      i: 1,
      questions: 2,
      question: "What is your favorite color?",
    };
    const { getByTestId } = render(<SurveyQuestion {...props} />);
    const bottomLineD = getByTestId("bottom-line-d");
    expect(bottomLineD).toBeInTheDocument();
  });
});
