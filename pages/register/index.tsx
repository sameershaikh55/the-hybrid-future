import { useState } from "react";
import Layout from "@/layout";
import Input from "@/components/input/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "./types";
import Link from "next/link";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  // Initialize router, errors and formData state, and passValidation
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });
  const [passValidation, setPassValidation] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

  // Define function to validate the password
  const validatePassword = (password: string) => {
    const rules = {
      minLength: { test: (p: string) => p.length >= 8, code: 1 },
      hasNumber: { test: (p: string) => /\d/.test(p), code: 2 },
      hasUppercase: { test: (p: string) => /[A-Z]/.test(p), code: 3 },
      hasLowercase: { test: (p: string) => /[a-z]/.test(p), code: 4 },
      hasSymbol: { test: (p: string) => /[^a-zA-Z0-9]/.test(p), code: 5 },
    };

    return Object.entries(rules)
      .filter(([_, rule]) => !rule.test(password))
      .map(([_, rule]) => rule.code);
  };

  // Define function to handle input change
  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    // Validate the input field
    let errorMessage = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "email is invalid";
      }
    } else if (name === "password") {
      const passwordErrors = validatePassword(value);
      setPassValidation(passwordErrors);
    }

    // Update the errors state
    setErrors({ ...errors, [name]: errorMessage });

    // Update the formData state
    setFormData({ ...formData, [name]: value });
  };

  // Define the fields of the form
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
      validation: true,
    },
  ];

  // Define function to handle form submission
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

    router.push("/thank_you");
    console.log(formData);
  };

  // Destructure email and password from the formData state
  const { email, password } = formData;

  return (
    <Layout title="Register">
      <div className={style["register_container"]}>
        <form
          onSubmit={handleSubmit}
          className={style["inner_register_container"]}
        >
          <h1 className={style.title}>Register ―</h1>
          <br />
          <br />
          <br />
          <div className={style.inputs}>
            {fields.map((content, i) => (
              <div key={i}>
                <Input
                  {...content}
                  error={errors[content.name]}
                  passValidation={passValidation}
                />
              </div>
            ))}
          </div>
          <br />
          <br />
          <br />
          <button
            disabled={
              email && password && !passValidation.length ? false : true
            }
            type="submit"
          >
            Register
          </button>
          <p className="f14">
            Already have an account?
            <Link href="/login">
              <button className="bg-transparent border-0 ms-1">
                <strong>Login</strong>
              </button>
            </Link>
          </p>
        </form>

        <p className={style["terms_conditions"]}>
          *In accessing this site, you agree to be bound by our{" "}
          <strong> Web Terms & Conditions. </strong> All client information
          accessed should be treated as Privileged and Strictly Confidential.
        </p>
      </div>
    </Layout>
  );
};

export default Login;
