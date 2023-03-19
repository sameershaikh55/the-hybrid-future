import { useState } from "react";
import { Props, SelectOption } from "./types";
import style from "./style.module.scss";

const QuestionOptions: React.FC<Props> = ({
  options, // an array of available options
  onChange, // a function to be called when an option is selected
  questions, // the total number of questions
  i, // the index of the current question
  heading, // the heading of the current question
  values, // an array of selected options
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false); // a state variable to toggle showing/hiding the options

  const handleOptionSelect = (value: SelectOption) => {
    onChange({
      heading,
      selectedOption: value,
    });
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  const isSelected = values.filter((content) => content.heading === heading); // an array of selected options for the current question

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {/* // if this is the first question, show the top line */}
      {i === 0 && <div className={style.top_line}></div>}
      <div className={`pointer py-3 py-md-4`}>
        <div
          className={`d-flex justify-content-between f18 ${
            (isSelected.length && "color6") || "color4"
          }`}
          onClick={toggleOptions}
        >
          {(isSelected.length && isSelected[0].selectedOption.option_label) ||
            "Please select..."}{" "}
          {/* // if an option has been selected, show its label, otherwise show a
          default message */}
          <div>
            {(showOptions && <img src="/assets/up.svg" alt="" />) || (
              <img src="/assets/down.svg" alt="" />
            )}{" "}
            {/* // show an up/down arrow depending on whether the options are being
            shown or not */}
          </div>
        </div>
        {showOptions && (
          <ul className="list-unstyled mb-0 mt-2">
            {options.map((option) => (
              <li
                key={option.option_id}
                onClick={() => handleOptionSelect(option)}
                className="fw600"
              >
                {option.option_label}
                {/* // show the label of each option */}
              </li>
            ))}
          </ul>
        )}{" "}
        {/* // show the list of options if the options are being shown */}
      </div>
      {/* // if this is not the last question, show the bottom line */}
      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {/* // if this is the last question, show the dotted bottom line */}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default QuestionOptions;
