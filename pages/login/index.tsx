import { useState } from "react";
import Layout from "@/layout";
import Input from "@/components/input/index";
import Checkbox from "@/components/checkbox/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "./types";
import Link from "next/link";
import VerificationNotification from "@/components/verificationNotification";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  // Get the router object from Next.js
  const router = useRouter();

  // Get the value of the 'verification' parameter from the URL
  const verification = router.query?.verification;

  // State variables for form data and errors
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  // Handler for input field changes
  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    // Validate the input field
    let errorMessage = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "email is invalid";
      }
    }

    // Update the errors state
    setErrors({ ...errors, [name]: errorMessage });

    // Update the formData state
    setFormData({ ...formData, [name]: value });
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  // Array of objects that define the form fields
  const fields = [
    {
      label: "Email",
      name: "email",
      value: formData.email,
      onChange: handleInputChange,
    },
    {
      label: "Password",
      name: "password",
      value: formData.password,
      onChange: handleInputChange,
    },
  ];

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for errors
    let hasError = false;
    for (const key in errors) {
      if (errors[key]) {
        hasError = true;
        break;
      }
    }

    // If there are errors, don't submit the form
    if (hasError) {
      return;
    }

    console.log(formData);
    router.push("/survey/start");
  };

  const { email, password } = formData;

  return (
    <Layout title="Login">
      <div className={style["login_container"]}>
        {verification && <VerificationNotification />}

        <form
          onSubmit={handleSubmit}
          className={style["inner_login_container"]}
        >
          <h1 className={style.title}>Login ―</h1>

          {!verification && (
            <p className={style.subtitle}>
              For single sign-on (SSO), input email and it will be recognised.
            </p>
          )}

          {verification && (
            <>
              <br />
              <br />
            </>
          )}

          <div className={style.inputs}>
            {fields.map((content, i) => (
              <div key={i}>
                <Input {...content} error={errors[content.name]} />
              </div>
            ))}
          </div>
          <br />
          <br />
          <div className={style["checkbox_container"]}>
            <div>
              <Checkbox
                label="Remember me"
                value={isChecked}
                handleChange={handleCheckboxChange}
              />
            </div>
            <Link className="text-decoration-none" href="/reset_password">
              <p className="fw-bold">Forgot password?</p>
            </Link>
          </div>
          <br />
          <br />
          <button
            disabled={isChecked && email && password ? false : true}
            type="submit"
          >
            Login
          </button>

          {(verification && (
            <p className={style["terms_conditions"]}>
              *In accessing this site, you agree to be bound by our{" "}
              <strong> Web Terms & Conditions. </strong> All client information
              accessed should be treated as Privileged and Strictly
              Confidential.
            </p>
          )) || (
            <p className={style["terms_conditions"]}>
              *Access to the The Hybrid Future is by permission only. In
              accessing this site, you agree to be bound by our
              <strong> Web Terms & Conditions. </strong> All client information
              accessed should be treated as Privileged and Strictly
              Confidential.
            </p>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
