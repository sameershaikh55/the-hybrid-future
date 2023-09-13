import { useState } from "react";
import Layout from "@/components/Layout/MainLayout";
import Input from "@/components/Input/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "./types";
import Link from "next/link";
import { useRouter } from "next/router";
import Checkbox from "@/components/Checkbox";

const Login: React.FC = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    cpassword: "",
  });
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    cpassword: "",
  });
  const [passValidation, setPassValidation] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

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

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    let errorMessage = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "email is invalid";
      }
    } else if (name === "password") {
      const passwordErrors = validatePassword(value);
      setPassValidation(passwordErrors);
    }

    setErrors({ ...errors, [name]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

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
    {
      label: "Confirm Password",
      name: "cpassword",
      value: formData.cpassword,
      onChange: handleInputChange,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = Object.values(errors).some((error) => error);

    let errorMessage = "";
    if (password !== cpassword) {
      errorMessage = "password does not match";
      setErrors({ ...errors, cpassword: errorMessage });
      hasError = true;
    } else {
      setErrors({ ...errors, cpassword: "" });
    }

    if (!hasError) {
      router.push("/thank_you");
      console.log(formData);
    }
  };

  const { email, password, cpassword } = formData;

  return (
    <Layout title="Register">
      <img className={style.authBG} src="/assets/authBG.svg" alt="" />
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

          <div className={style["checkbox_container"]}>
            <div>
              <Checkbox
                label={
                  <>
                    I have read and agreed to the{" "}
                    <strong className="fw700">Terms & Conditions</strong>
                  </>
                }
                value={isChecked}
                handleChange={handleCheckboxChange}
              />
            </div>
          </div>

          <br />
          <br />
          <br />
          <button
            disabled={
              email && password && isChecked && !passValidation.length
                ? false
                : true
            }
            type="submit"
          >
            Register
          </button>
          <p className="f14">
            Already have an account?
            <Link className={style.loginLINK} href="/login">
              <button className="bg-transparent border-0 ms-1">
                <strong>Login</strong>
              </button>
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
