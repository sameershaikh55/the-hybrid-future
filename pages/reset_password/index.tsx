import { useState } from "react";
import Layout from "@/components/Layout/MainLayout";
import style from "./style.module.scss";
import Input from "@/components/Input/index";
import { formData, InputChangeEvent, FormErrors } from "../../types/reset_password";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({ email: "" });
  const [formData, setFormData] = useState<formData>({ email: "" });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;

    let errorMessage = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "email is invalid";
    }

    setErrors({ ...errors, [name]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = Object.values(errors).some((error) => error);

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
              value={email}
              onChange={handleInputChange}
              error={errors["email"]}
            />
            {email && !errors.email && (
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
            disabled={!email}
            type="submit"
          >
            Enter
          </button>
          <p className="f14">
            Return to
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

export default ResetPassword;
