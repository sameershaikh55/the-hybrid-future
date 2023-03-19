import { useState } from "react";
import Layout from "@/layout";
import Input from "@/components/input/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "./types";

const SetPassword: React.FC = () => {
  // Initialize errors and formData state, and passValidation
  const [errors, setErrors] = useState<FormErrors>({
    password: "",
    cpassword: "",
  });
  const [formData, setFormData] = useState<formData>({
    password: "",
    cpassword: "",
  });

  // Define function to handle input change
  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData({ ...formData, [name]: value });
  };

  // Define the fields of the form
  const fields = [
    {
      label: "Password ",
      name: "password",
      value: formData.password,
      onChange: handleInputChange,
    },
    {
      label: "Confirm Password",
      name: "cpassword",
      value: formData.cpassword,
      onChange: handleInputChange,
    },
  ];

  // Define function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the input field
    let errorMessage = "";
    if (password !== cpassword) {
      errorMessage = "password does not match";

      // Update the errors state
      setErrors({ ...errors, cpassword: errorMessage });
      return;
    } else {
      setErrors({ ...errors, cpassword: "" });
    }

    console.log(formData);
  };

  const { password, cpassword } = formData;

  return (
    <Layout title="Login">
      <div className={style["set_password_container"]}>
        <form
          onSubmit={handleSubmit}
          className={style["inner_set_password_container"]}
        >
          <h1 className={style.title}>Set a new password ­—</h1>
          <br />
          <br />
          <div className={style.inputs}>
            {fields.map((content, i) => (
              <div key={i}>
                <Input {...content} error={errors[content.name]} />
              </div>
            ))}
          </div>
          <br />
          <br />
          <button disabled={password && cpassword ? false : true} type="submit">
            Confirm
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SetPassword;
