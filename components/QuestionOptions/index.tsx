import { useEffect, useState } from "react";
import { Props, SelectOption } from "./types";
import style from "./style.module.scss";

const QuestionOptions: React.FC<Props> = ({
  options,
  onChange,
  questions,
  i,
  heading,
  values,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState("");
  const [filteredOptionsState, setFilteredOptionsState] = useState<SelectOption[]>(options.slice(0, 5));

  const handleOptionSelect = (value: SelectOption) => {
    onChange({ heading, selectedOption: value });
    setValue(value.option_label);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const isSelected = values.filter((content) => content.heading === heading);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filteredOptions = options
      .filter((option) =>
        option.option_label.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5);

    setFilteredOptionsState(filteredOptions);
  };

  useEffect(() => {
    setValue(isSelected[0]?.selectedOption.option_label);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {i === 0 && <div className={style.top_line}></div>}
      <div className={`pointer py-3 py-md-4`}>
        <div
          className={`d-flex justify-content-between f18 ${
            isSelected.length ? "color6" : "color4"
          }`}
          onClick={toggleOptions}
        >
          {heading === "Which country do you spend most of your time in?" ? (
            <input
              className={style.searchInput}
              id="country"
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Please select..."
            />
          ) : (
            (isSelected.length && isSelected[0].selectedOption.option_label) ||
            "Please select..."
          )}

          <div>
            {showOptions ? (
              <img src="/assets/up.svg" alt="Collapse options" />
            ) : (
              <img src="/assets/down.svg" alt="Expand options" />
            )}
          </div>
        </div>

        {showOptions && (
          <ul className="list-unstyled mb-0 mt-2">
            {(heading === "Which country do you spend most of your time in?" ? filteredOptionsState : options).map((option) => (
              <li
                key={option.option_id}
                onClick={() => handleOptionSelect(option)}
                className="fw600"
              >
                {option.option_label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default QuestionOptions;
