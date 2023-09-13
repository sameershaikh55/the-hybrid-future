import { useState } from "react";
import Layout from "@/components/Layout/MainLayout";
import Input from "@/components/Input/index";
import style from "./style.module.scss";
import { formData, InputChangeEvent, FormErrors } from "./types";

const SetPassword: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({
    password: "",
    cpassword: "",
  });
  const [formData, setFormData] = useState<formData>({
    password: "",
    cpassword: "",
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fields = [
    {
      label: "Password",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, cpassword } = formData;

    if (password !== cpassword) {
      setErrors({ ...errors, cpassword: "password does not match" });
      return;
    }

    setErrors({ ...errors, cpassword: "" });
    console.log(formData);
  };

  const { password, cpassword } = formData;

  return (
    <Layout title="Set Password">
      <div className={style.set_password_container}>
        <form onSubmit={handleSubmit} className={style.inner_set_password_container}>
          <h1 className={style.title}>Set a new password ­—</h1>
          <br />
          <br />
          <div className={style.inputs}>
            {fields.map((field, i) => (
              <div key={i}>
                <Input {...field} error={errors[field.name]} />
              </div>
            ))}
          </div>
          <br />
          <br />
          <button disabled={!password || !cpassword} type="submit">
            Confirm
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SetPassword;
