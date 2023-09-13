import styles from "./style.module.scss";
import { Props } from "./types";

const Checkbox: React.FC<Props> = ({ label, value, handleChange }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkbox}>
        <span className={styles.label}>{label}</span>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={value}
          onChange={handleChange}
        />
        <span className={styles.checkboxCheck}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkboxSvg}>
            <path d="M 1 7 L 4 10 L 10 2" fill="none" />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
