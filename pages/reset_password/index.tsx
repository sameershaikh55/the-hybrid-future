import { useState } from "react";
import Layout from "@/layout";
import style from "./style.module.scss";
import Input from "@/components/input/index";
import { formData, InputChangeEvent, FormErrors } from "./types";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPassword: React.FC = () => {
  // Initialize router, errors and formData state
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
  });
  const [formData, setFormData] = useState<formData>({
    email: "",
  });

  // Define function to handle input change
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

    router.push("/set_password");
    console.log(formData);
  };

  const { email } = formData;

  return (
    <Layout title="Reset Password">
      <div className={style.forget_password}>
        <form onSubmit={handleSubmit} className={style.inner_forget_password}>
          <h1 className={style.title}>Reset your password ­—</h1>

          <p className={style.subtitle}>
            Enter the email address associated with your account and we’ll send
            you a link to reset your password.
          </p>

          <div className={style.inputs}>
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors["email"]}
            />
            {formData.email && !errors.email && (
              <p style={{ marginTop: "-16px" }} className="f12">
                Email recognised
              </p>
            )}
          </div>
          <br />
          <br />
          <br />
          <button
            className={style.submit}
            disabled={email ? false : true}
            type="submit"
          >
            Enter
          </button>
          <p className="f14">
            Return to
            <Link href="/login">
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

export default ResetPassword;
