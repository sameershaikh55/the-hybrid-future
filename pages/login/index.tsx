import { useState } from "react";
import Layout from "@/components/Layout/MainLayout";
import Input from "@/components/Input/index";
import Checkbox from "@/components/Checkbox/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "../../types/login";
import Link from "next/link";
import VerificationNotification from "@/components/VerificationNotification";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const flowName = process.env.NEXT_PUBLIC_ORDER_KEY;

  const verification = router.query?.verification;

  const [errors, setErrors] = useState<FormErrors>({ email: "", password: "" });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    let errorMessage = "";
    // TODO robust email validation
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "email is invalid";
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
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = Object.values(errors).some((error) => error);
    // const tempLoginPassword = process.env.NEXT_PUBLIC_TEMP_LOGIN_PASSWORD;

    // if (formData.password !== tempLoginPassword) {
    //   setErrors({ ...errors, password: "incorrect password" });
    //   hasError = true;
    // }

    if (hasError) return;

    // console.log(formData);

    if (flowName === "onboarding") router.push("/survey/start");
    else if (flowName === "campaign") router.push("/campaign/start");
    else if (flowName === "profile") router.push("/profile_update/start");
    else router.push("/no_question");
  };

  const { email, password } = formData;

  return (
    <Layout title="Login">
      <img className={style.authBG} src="/assets/loginBG.svg" alt="" />
      <div className={style["login_container"]}>
        {verification && <VerificationNotification />}
        <form
          onSubmit={handleSubmit}
          className={style["inner_login_container"]}
        >
          <h1 className={style.title}>Login ―</h1>
          <div className={style.inputs}>
            {fields.map((content, i) => (
              <div key={i}>
                <Input {...content} error={errors[content.name]} />
              </div>
            ))}
          </div>
          <div className={style["checkbox_container"]}>
            <div>
              <Checkbox
                label="Remember me"
                value={isChecked}
                handleChange={handleCheckboxChange}
              />
            </div>
            <Link href="/reset_password">
              <p className="fw-bold">Forgot password?</p>
            </Link>
          </div>
          <button disabled={email && password ? false : true} type="submit">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
